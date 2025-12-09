from django.shortcuts import render
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import permissions

from .models import Posts
from .serializers import PostsSerializer, PostUpdateSerializer

class PostPagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100 
    
# Create your views here.
class CreatePostView(APIView):
    """
    Endpoint for creating a post. Requires authentication.
    """

    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        post = request.data
        serializer_class = PostsSerializer(data=post)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePostsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        new_content = request.data
        new_content_serializer = PostUpdateSerializer(new_content)
        if new_content_serializer.is_valid():
            post_id = new_content_serializer.data.get("post_id", -1)
            if len(post_id) >= 0: return Response(new_content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            post = Posts.object.filter(id=post_id)
            updated_post = PostsSerializer(post, new_content_serializer.data)
            return Response(updated_post.data, status=status.HTTP_200_OK)
        return Response(new_content_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetPostsView(APIView):
    """
    Endpoint for retrieving all relevant posts for the user.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, post_id):
        post = Posts.objects.filter(id=post_id)
        serializer_class = PostsSerializer(post)
        if serializer_class.s_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_200_OK)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

class BatchPostsView(APIView):
    """
    Endpoint for retrieving all posts.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request, class_id):
        posts = Posts.objects.all() # class_id filter() 
        paginator = PostPagination()
        page = paginator.paginate_queryset(posts, request, view=self)
        serializer = PostsSerializer(page, many=True)
        return Response(paginator.get_paginated_response(serializer.data), 
                        status=status.HTTP_200_OK)