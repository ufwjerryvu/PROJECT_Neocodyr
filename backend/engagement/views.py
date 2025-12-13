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
        serializer_class = PostLikeSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response({"message": f"successfully liked post"}, status=status.HTTP_201_CREATED)

        return Response({"error": "Failed to like the post"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id):
        delete_result = LikesPost.objects.filter(
            user = request.user.id,
            comment=post_id
        ).delete()
        
        return Response({"message": f"Amount of rows removed {delete_result[0]}"}, status=status.HTTP_204_NO_CONTENT)
    
class ReactsCommentView(APIView):
    """
    For the purpose of add and removing the like / reaction to the comment. 
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer_class = CommentLikeSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response({"message": f"successfully liked comment"}, status=status.HTTP_201_CREATED)

        return Response({"error": "Failed to like the comment"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, comment_id):
        delete_result = LikesComment.objects.filter(
            user = request.user.id,
            comment=comment_id
        ).delete()
        
        return Response({"message": f"Amount of rows removed {delete_result[0]}"}, status=status.HTTP_204_NO_CONTENT)