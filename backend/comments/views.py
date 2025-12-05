from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from .serializers import (
    CommentSerializer,
    CreateCommentSerializer,
    CommentUpdateSerializer
)

class CommentUpdateView(APIView):
    def get(self, request):
        return Response("Get all comments from POST ID endpoint")

    def patch(self, request):
        return Response("Update comment endpoint")
    
class ReplyCommentView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        return Response("Reply to comment endpoint")
    
class ReplyPostView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_node_class = CreateCommentSerializer
    
    def post(self, request):
        comment = request.data
        serializer = self.serializer_node_class(data=comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)