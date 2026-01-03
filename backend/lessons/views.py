from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from .permissions import (
    IsAuthorViaLesson,
    IsAuthorViaLecture,
    IsAuthorViaProblem
)
from .serializers import (
    LectureDetailsSerializer,
    ProblemDetailsSerializer
)
from rest_framework.exceptions import (
    NotFound
)
from .models import (
    Lesson, 
    Lecture, 
    Problem,
    LessonItem
)
from django.contrib.contenttypes.models import ContentType

class LectureCreateView(APIView):
    """
    For creating a lecture.
    """
    
    permission_classes = [permissions.IsAuthenticated, IsAuthorViaLesson]

    def post(self, request, lesson_id):        
        try:
            # Checks if the lesson exist. 
            Lesson.objects.get(id=lesson_id)

            serializer = LectureDetailsSerializer(
                data=request.data,
                context={"lesson_id": lesson_id}
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Lesson.DoesNotExist:
            raise NotFound()

class LectureDetailsView(APIView):
    """
    For other CRUD operations related to lectures.
    """
    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        elif self.request.method == "PATCH" or self.request.method == "DELETE":
            return [permissions.IsAuthenticated(), IsAuthorViaLecture()]
        
    def get(self, request, lecture_id):
        try:
            lecture = Lecture.objects.get(id=lecture_id)
        except Lecture.DoesNotExist:
            raise NotFound()
        
        serializer = LectureDetailsSerializer(lecture)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, lecture_id):
        try:
            lecture = Lecture.objects.get(id=lecture_id)

            serializer = LectureDetailsSerializer(
                lecture,
                data=request.data,
                partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Lecture.DoesNotExist:
            raise NotFound()
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, lecture_id):
        try:
            lecture = Lecture.objects.get(id=lecture_id)
            lesson = lecture.lesson

            # Find the object that keeps track of the order.
            item = LessonItem.objects.get(
                lesson_id=lesson.id,
                content_type=ContentType.objects.get_for_model(Lecture),
                object_id=lecture.id
            )

            # Delete it, too, because it doesn't delete cascade.
            item.delete()
            lecture.delete()
            
        except Lecture.DoesNotExist:
            raise NotFound()

        return Response(status=status.HTTP_204_NO_CONTENT)

class ProblemCreateView(APIView):
    """
    For creating a problem
    """

    permission_classes = [permissions.IsAuthenticated, IsAuthorViaLesson]
    
    def post(self, request, lesson_id):
        try:
            Lesson.objects.get(id=lesson_id)

            serializer = ProblemDetailsSerializer(
                data=request.data,
                context={"lesson_id": lesson_id}
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Lesson.DoesNotExist:
            raise NotFound()

class ProblemDetailsView(APIView):
    """
    For other CRUD operations related to problems.
    """

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        elif self.request.method == "PATCH" or self.request.method == "DELETE":
            return [permissions.IsAuthenticated(), IsAuthorViaProblem()]

    def get(self, request, problem_id):
        try:
            problem = Problem.objects.get(id=problem_id)
            serializer = ProblemDetailsSerializer(problem)
        except Problem.DoesNotExist:
            raise NotFound()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, problem_id):
        try:
            problem = Problem.objects.get(id=problem_id)

            serializer = ProblemDetailsSerializer(
                problem, 
                data=request.data,
                partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Problem.DoesNotExist:
            raise NotFound()
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, problem_id):
        try:
            problem = Problem.objects.get(id=problem_id)
            lesson = problem.lesson

            # Deleting the object that keeps the polymorphic ordering
            item = LessonItem.objects.get(
                lesson_id=lesson.id,
                content_type=ContentType.objects.get_for_model(Problem),
                object_id=problem.id
            )

            problem.delete()
            item.delete()
        except Problem.DoesNotExist:
            raise NotFound()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class LessonItemsDetailsView(APIView):
    """
    Retrieves ordered list of lesson items (lectures and problems) for a lesson.
    Given the lesson's ID, we should be able to retrieve all the items.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, lesson_id):
        try:
            items = LessonItem.objects.filter(
                lesson_id=lesson_id
            )

            result = []
            for item in items:
                obj = item.content_object

                if isinstance(item.content_object, Lecture):
                    result.append(LectureDetailsSerializer(obj).data)
                elif isinstance(item.content_object, Problem):
                    result.append(ProblemDetailsSerializer(obj).data)

            return Response(result, status=status.HTTP_200_OK)

        except Lesson.DoesNotExist:
            raise NotFound()
