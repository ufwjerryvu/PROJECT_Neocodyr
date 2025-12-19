from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import (
    CourseCreateSerializer,
    CourseOverviewReadSerializer,
    CourseSettingsUpdateSerializer,
    LessonSerializer
)
from rest_framework.exceptions import (
    PermissionDenied, 
    NotFound
)
from .permissions import IsAnAuthor
from .models import Course, Lesson

class CourseAuthorCreateView(APIView):
    """
    Must be authenticated and must be assigned as a dedicated author in order
    to create courses. 
    """
    permission_classes = [permissions.IsAuthenticated, IsAnAuthor]

    def post(self, request):
        serializer = CourseCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CourseDetailView(APIView):
    """
    Lets the author update their own course's information.
    """

    def get_permissions(self):
        if self.request.method == "PATCH":
            return [permissions.IsAuthenticated(), IsAnAuthor()]
        return [permissions.IsAuthenticated()]
    
    # Request parameters from slug
    def get (self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
            serializer = CourseOverviewReadSerializer(course)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            raise NotFound()
    
    def patch(self, request, course_id):
        user = request.user

        try:
            course = Course.objects.get(id=course_id)

            if course.author != user:
                raise PermissionDenied()
            
            serializer = CourseSettingsUpdateSerializer(
                course, 
                data=request.data,
                partial=True
            )

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Course.DoesNotExist:
            raise NotFound()

class CourseAuthoredReadView(APIView):
    """
    Gets the overview of all the authored courses. Returns a JSON array of all
    the courses that the current author authored. 
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = CourseOverviewReadSerializer(data=request.data)
        # TODO: implement this later
        return 
    
class CourseThumbnailDetailView(APIView):
    """
    Handles course thumbnail operations for authorized users.
    """

    def get_permissions(self):
        if self.request.method == "DELETE":
            return [permissions.IsAuthenticated(), IsAnAuthor()]
        
        return [permissions.IsAuthenticated()]
    
    def delete(self, request, course_id):
        user = request.user 
        
        try:
            course = Course.objects.get(id=course_id)

            if course.author != user:
                raise PermissionDenied()
            
            course.thumbnail.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            raise NotFound()
        
class LessonCreateView(APIView):
    """
    Allows authors to create new lessons.
    """

    permission_classes = [permissions.IsAuthenticated, IsAnAuthor]

    def post(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            raise NotFound()

        if course.author != request.user:
            return PermissionError()
        
        serializer = LessonSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(course=course)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LessonDetailView(APIView):
    """
    Allows authors to update and delete lessons and allows authenticated users
    to view the details. 
    """
    
    def get_permissions(self):
        if self.request.method in ["PATCH", "DELETE"]:
            return [permissions.IsAuthenticated(), IsAnAuthor()]
        elif self.request.method == "GET":
            return [permissions.IsAuthenticated()]

    def patch(self, request, lesson_id):
        user = request.user
        
        try:
            lesson = Lesson.objects.get(id=lesson_id)
            course = lesson.course
        except Lesson.DoesNotExist:
            raise NotFound()
        
        if course.author != user:
            raise PermissionDenied()
        
        # We would probably need a new serializer if reordering is required
        serializer = LessonSerializer(lesson, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, lesson_id):
        user = request.user 
        
        try:
            lesson = Lesson.objects.get(id=lesson_id)

            if lesson.course.author != user:
                raise PermissionDenied()
            
            lesson.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Lesson.DoesNotExist:
            raise NotFound()