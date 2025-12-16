from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import (
    CourseCreateSerializer,
    CourseOverviewReadSerializer
)
from .permissions import IsAuthor

class CourseAuthorCreateViews(APIView):
    """
    Must be authenticated and must be assigned as a dedicated author in order
    to create courses. 
    """
    permission_classes = [permissions.IsAuthenticated, IsAuthor]

    def post(self, request):
        serializer = CourseCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseAuthoredReadViews(APIView):
    """
    Gets the overview of all the authored courses. Returns a JSON array of all
    the courses that the current author authored. 
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = CourseOverviewReadSerializer(data=request.data)
        # TODO: complete this
        return 
    
