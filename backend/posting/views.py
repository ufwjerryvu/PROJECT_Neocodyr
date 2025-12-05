from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import permissions

from .serializers import (
    PostCreateSerializer,
    PostReadSerializer
)

# Create your views here.
class CreatePostView(APIView):
    """
    Endpoint for creating a post. Requires authentication.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return Response("Create post endpoint")
    
class GetPostsView(APIView):
    """
    Endpoint for retrieving all relevant posts for the user.
    """
    posts_per_page = 20
    permission_classes = [permissions.AllowAny]

    def get(self, request, page):
        return Response(f"Get all relevant posts for the user")
    
class BatchPostsView(APIView):
    """
    Endpoint for retrieving all posts.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        
        return Response("Get a posts endpoint")