from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import permissions

from .models import LikesPost, LikesComment
from .serializer import PostLikeSerializer, CommentLikeSerializer

class ReactsPostView(APIView):
    """
    For the purpose of add and removing the like / reaction to the post. 
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PostLikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id):
        try:
            LikesPost.objects.filter(
                user = request.user.id,
                comment=post_id
            ).delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ReactsCommentView(APIView):
    """
    For the purpose of add and removing the like / reaction to the comment. 
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = CommentLikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, comment_id):
        try:
            LikesComment.objects.filter(
                user = request.user.id,
                comment=comment_id
            ).delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        