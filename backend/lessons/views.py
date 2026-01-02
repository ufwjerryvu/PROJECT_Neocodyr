from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from .permissions import IsAuthor
from .serializers import (
    LectureCreateSerializer,
    ProblemCreateSerializer
)
from rest_framework.exceptions import (
    NotFound
)
from .models import Lesson

class LectureCreateView(APIView):
    """
    For creating a lecture.
    """
    
    permission_classes = [permissions.IsAuthenticated, IsAuthor]

    def post(self, request, lesson_id):        
        try:
            # Checks if the lesson exist. 
            Lesson.objects.get(id=lesson_id)

            serializer = LectureCreateSerializer(
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

class ProblemCreateView(APIView):
    """
    For creating a problem
    """

    permission_classes = [permissions.IsAuthenticated, IsAuthor]
    
    def post(self, request, lesson_id):
        try:
            Lesson.objects.get(id=lesson_id)

            serializer = ProblemCreateSerializer(
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
