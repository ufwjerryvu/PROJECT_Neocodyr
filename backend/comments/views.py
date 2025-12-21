from django.shortcuts import render
from django.http import Http404
from django.db.models import F
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination

from .models import Comments, CommentHierarchyTable
from .serializers import (
    GetMoreCommentsSerializer,
    ReplyPostSerializer,
    ReplyCommentSerializer,
    CommentUpdateSerializer
)


class CommentPagination(LimitOffsetPagination):
    """Pagination settings for comment queries."""

    default_limit = 10
    max_limit = 100

class CommentGetView(APIView):
    """API view for retrieving paginated comments for a post."""

    def get(self, request, post_id):
        page_result = []
        curr_depth = 0
        
        hierarchy = CommentHierarchyTable.objects.filter(
            original_comment__post_id=post_id
        )
        
        root_comments_qs = hierarchy.filter(depth=curr_depth)
        
        paginator = CommentPagination()
        comment_page = paginator.paginate_queryset(root_comments_qs, request, view=self)
        
        for root_comment in comment_page:
            comment = root_comment.values(
                comment_id=F("original_comment__id"), 
                post_id=F("original_comment__post_id"), 
                content=F("original_comment__content"), 
                author=F("original_comment__author__username"), 
                likes=F("original_comment__likes"), 
                reply_time=F("original_comment__reply_time")
            )
            
            comment['replies'] = list(hierarchy.filter(depth=curr_depth + 1).filter(
                original_comment=comment.id
            ).value(comment_id=F("descendant_comment__id"), 
                    post_id=F("descendant_comment__post_id"), 
                    content=F("descendant_comment__content"), 
                    author=F("descendant_comment__author__username"), 
                    likes=F("descendant_comment__likes"), 
                    reply_time=F("descendant_comment__reply_time")))
        
            page_result.append(comment)

        return Response(
            paginator.get_paginated_response(page_result),
            status=status.HTTP_200_OK
        )

    def post(self, request):
        page_result = []
        curr_depth = 0
        
        serializer = GetMoreCommentsSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )    
            
        hierarchy = CommentHierarchyTable.objects.filter(
            original_comment__post_id=serializer.validated_data['post_id'].id
        )
        
        root_comments_qs = hierarchy.filter(depth=curr_depth)
        
        paginator = CommentPagination()
        comment_page = paginator.paginate_queryset(root_comments_qs, request, view=self)
        
        for root_comment in comment_page:
            comment = root_comment.values(
                comment_id=F("original_comment__id"), 
                post_id=F("original_comment__post_id"), 
                content=F("original_comment__content"), 
                author=F("original_comment__author__username"), 
                likes=F("original_comment__likes"), 
                reply_time=F("original_comment__reply_time")
            )
            
            comment['replies'] = list(hierarchy.filter(depth=curr_depth + 1).filter(
                original_comment=comment.id
            ).value(comment_id=F("descendant_comment__id"), 
                    post_id=F("descendant_comment__post_id"), 
                    content=F("descendant_comment__content"), 
                    author=F("descendant_comment__author__username"), 
                    likes=F("descendant_comment__likes"), 
                    reply_time=F("descendant_comment__reply_time")))
        
            page_result.append(comment)

        return Response(
            paginator.get_paginated_response(page_result),
            status=status.HTTP_200_OK
        )
    

class CommentUpdateView(APIView):
    """API view for updating existing comments."""

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk) -> Comments:
        try:
            return Comments.objects.get(pk=pk)
        except Comments.DoesNotExist:
            raise Http404

    def patch(self, request, comment_id):
        comment = self.get_object(comment_id)
        serializer = CommentUpdateSerializer(
            comment,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_ACCEPTED)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ReplyCommentView(APIView):
    """API view for replying to a comment (adds to closure table)."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        new_reply = request.data

        serializer = ReplyCommentSerializer(data=new_reply)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ReplyPostView(APIView):
    """API view for replying to a post with a new comment."""

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        comment = request.data
        serializer = ReplyPostSerializer(data=comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )