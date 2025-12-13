from rest_framework import serializers
from .models import LikesComment, LikesPost

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesPost
        fields = ["user", "post"]
    
    def create(self, validated_data):
        like = LikesPost(validated_data)
        like.save()
        return like

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesComment
        fields = ["user", "comment"]
    
    def create(self, validated_data):
        like = LikesComment(validated_data)
        like.save()
        return like