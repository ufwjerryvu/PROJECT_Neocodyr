from django.shortcuts import render
from django.db.models import Q
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied, NotFound

from courses.models import Course
from .models import Posts
from .serializers import PostSerializer, PostUpdateSerializer, BatchReadPostsSerializer


class PostPagination(LimitOffsetPagination):
    """
    Pagination settings for post queries.
    """

    default_limit = 20
    max_limit = 100

class CreatePostView(APIView):
    """
    API view for creating a new post.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        post = request.data
        serializer = PostSerializer(data=post)

        if serializer.is_valid():
            serializer.save()
            
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class UpdatePostsView(APIView):
    """API view for updating existing posts."""

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, post_id):
        new_content = request.data
        old_post = Posts.objects.filter(id=post_id)
        new_content_serializer = PostUpdateSerializer(old_post, data=new_content, partial=True)

        if new_content_serializer.is_valid():
            author_id = new_content_serializer.data.get("author_id", -1)

            if author_id < 0 or author_id != request.user.id:
                raise PermissionDenied("You don't have permission to edit this post")
            
            post = Posts.object.filter(id=post_id)
            
            if len(post) >= 0: # If there is a post
                updated_post = PostSerializer(post, data=new_content_serializer.data, partial=True)
                return Response(updated_post.data, status=status.HTTP_200_OK)
            
        raise NotFound("Post not found")

class BatchPostsView(APIView):
    """API view for retrieving all posts in a course."""

    permission_classes = [permissions.AllowAny]

    def get(self, request, course_id):
        # Check if they can view the posts
        user_id = request.user.id
        
        user_in_course = Course.objects.filter(
            id=course_id
        ).filter(Q(student=user_id) | Q(instructor=user_id))

        if len(user_in_course) == 0:
            raise PermissionDenied("You don't have permission to edit this post")
            
        posts = Posts.objects.filter(course_id=course_id).order_by('-created_at')
        paginator = PostPagination()
        page = paginator.paginate_queryset(posts, request, view=self)
        serializer = BatchReadPostsSerializer(page)
        
        return Response(
            paginator.get_paginated_response(serializer.data),
            status=status.HTTP_200_OK
        )