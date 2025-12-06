from django.shortcuts import render
from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination

from .models import Comments, CommentHierarchyTable
from .serializers import (
    CommentSerializer,
    CreateCommentHierarchySerializer,
    CommentUpdateSerializer
)

class CommentPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100 

class CommentUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, pk) -> Comments:
        try:
            return Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            raise Http404
    
    '''
    For the purpose for getting batch comments 
    '''
    def get(self, request, post_id):
        comments = Comments.objects.filter(post_id=post_id).order_by('created_at')
        paginator = CommentPagination()
        page = paginator.paginate_queryset(comments, request, view=self)
        serializer = CommentSerializer(page, many=True)
        
        return Response(paginator.get_paginated_response(serializer.data), 
                        status=status.HTTP_200_OK)
    '''
    For the purpose for updating comment
    '''
    def patch(self, request, comment_id):
        comment = self.get_object(comment_id)
        serializer = CommentUpdateSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReplyCommentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    '''
    For the purpose of replying to a comment. This should add to the closure table.
    '''
    def post(self, request):
        comment_hierarchy = request.data
        
        serializer = CreateCommentHierarchySerializer(data=comment_hierarchy)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReplyPostView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    '''
    For the purpose to replying to a post.
    '''
    def post(self, request):
        comment = request.data
        serializer = CommentSerializer(data=comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)