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
    """Pagination settings for comment queries."""

    default_limit = 10
    max_limit = 100


class CommentGetView(APIView):
    """API view for retrieving paginated comments for a post."""

    def get(self, request, post_id):
        comments = (
            Comments.objects.filter(post_id=post_id).order_by('created_at')
        )
        paginator = CommentPagination()
        page = paginator.paginate_queryset(comments, request, view=self)
        serializer = CommentSerializer(page, many=True)

        return Response(
            paginator.get_paginated_response(serializer.data),
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

    def put(self, request):
        comment_hierarchy = request.data

        serializer = CreateCommentHierarchySerializer(comment_hierarchy)
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

    def put(self, request):
        comment = request.data
        serializer = CommentSerializer(comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )