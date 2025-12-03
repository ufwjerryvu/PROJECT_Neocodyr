from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta

from .serializers import (
    UserCreateSerializer, 
    UserReadSerializer, 
    UserUpdateSerializer
)

from rest_framework import permissions, viewsets

class RegisterView(APIView):
    """
    For the purpose of registering a user. Required fields are specified
    in the user create serializer.
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreateSerializer

    # NOTE: serializer class attribute is needed for browsable DRF APIs
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserUpdateView(APIView):
    """
    Endpoint allows retrieving the current user's basic information and allows
    the user to update fields specified in the update serializer. 
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user

        if user.last_updated + timedelta(days=7) > timezone.now():
            return Response({
                "error": "Must wait the full 7 days to update details again."
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

