from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination

from .models import Class, ClassInstructor, ClassStudent
from .serializers import ClassSerializer, GetPrivateClassSerializer, ClassCreateSerializer

"""
This is for the purpose of lazy loading public classes.
"""
class ClassPagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100 
    
class GetClassesView(APIView):
    '''_summary_
    Get's all public classes
    '''
    def get(self, request):
        classes = Class.objects.filter(is_public=True)
        paginator = ClassPagination()
        serializer = ClassSerializer(classes, many=True)
        return Response(paginator.get_paginated_response(serializer.data), 
                        status=status.HTTP_200_OK) 
        
    '''_summary_
    Get's all the private classes
    '''
    def post(self, request):
        users = request.data
        serializer = GetPrivateClassSerializer(users, many=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        classes_attended = ClassStudent.objects.filter(user_=serializer._validated_data.get("user_id"))
        paginator = ClassPagination()
        return Response(paginator.get_paginated_response(classes_attended), status=status.HTTP_200_ACCEPTED)
        
class ModifyClassView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    """_summary_
    Create brand new class
    """
    def put(self, request):
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Created new class!", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    """_summary_
    Update the a current class
    """
    def patch(self, request, class_id):
        current_class = Class.objects.filter(id=class_id)
        serializer = ClassSerializer(current_class, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response("Updated the current class", status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """_summary_
    Removed the current class
    """
    def delete(self, request, class_id):
        current_class = Class.objects.filter(id=class_id)
        current_class.delete()
        return Response("Removed the current class", status=status.HTTP_204_NO_CONTENT)