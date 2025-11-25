from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer
from rest_framework import permissions

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CreateUserSerializer

    # NOTE: serializer class attribute is needed for browsable DRF APIs
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)