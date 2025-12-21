from rest_framework import serializers
from datetime import datetime
from .models import Comments, CommentHierarchyTable
from posting.models import Posts
from users.models import User

class GetMoreCommentsSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving more comments.
    """
    comment_id = serializers.PrimaryKeyRelatedField(
        source='comment', queryset=Comments.objects.all()
    )
    
    post_id = serializers.PrimaryKeyRelatedField(
        source='post', queryset=Posts.objects.all()
    )
    
    depth = serializers.IntegerField()
    
    
class CommentUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating comment content.
    """

    class Meta:
        model = Comments
        fields = ['content', 'updated_at']

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.updated_at = (
            validated_data.get('updated_at', instance.updated_at)
        )
        instance.save()
        return instance

class ReplyPostSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new comments.
    """

    class Meta:
        model = Comments
        fields = ['post_id', 'author_id', 'content']

    def create(self, validated_data):
        new_comment = Comments(**validated_data)
        new_comment.reply_time = datetime.now().strftime("%d/%m/%Y %H:%M")
        new_comment.save()
        
        hierarchy_data = {
            "original_comment": new_comment.id,
            "descendant_comment": new_comment.id,
            "depth": 0
        }
        hierarchy = CommentHierarchyTable(hierarchy_data)
        hierarchy.save()
        
        return new_comment

class ReplyCommentSerializer(serializers.ModelSerializer):
    post_id = serializers.PrimaryKeyRelatedField(
        source='post', queryset=Posts.objects.all()
    )
    
    comment_id = serializers.PrimaryKeyRelatedField(
        source='comment', queryset=Comments.objects.all()
    )
    
    author_id = serializers.PrimaryKeyRelatedField(
        source='author', queryset=User.objects.all()
    )

    class Meta:
        model = Comments
        fields = ['content', 'post_id', 'comment_id', 'author_id']  
    
    def create(self, validated_data):
        
        new_reply = Comments.objects.create(**validated_data)
        new_reply.reply_time = datetime.now().strftime("%d/%m/%Y %H:%M")
        new_reply.save()
        
        hierarchy_data = {
            "original_comment": validated_data.get('comment_id'),
            "descendant_comment": new_reply.id,
            "depth": 0
        }
        hierarchy = CommentHierarchyTable(hierarchy_data)
        hierarchy.save()
        return new_reply