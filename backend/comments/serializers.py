from rest_framework import serializers
from datetime import datetime
from .models import Comments, CommentHierarchyTable


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for reading comment data.
    """

    class Meta:
        model = Comments
        fields = [
            'post_id', 'author_id', 'likes', 'content',
            'reply_time'
        ]


class CreateCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new comments.
    """

    reply_time = serializers.DateTimeField(format="%d/%m/%Y %H:%M")

    class Meta:
        model = Comments
        fields = ['post_id', 'author_id', 'content']

    def create(self, validated_data):
        new_comment = Comments(**validated_data)
        new_comment.reply_time = datetime.now().strftime("%d/%m/%Y %H:%M")
        new_comment.save()
        return new_comment


class CreateCommentHierarchySerializer(serializers.ModelSerializer):
    """
    Serializer for creating comment hierarchy entries.
    """

    class Meta:
        model = CommentHierarchyTable
        fields = ['original_comment', 'depth']


class CommentHierarchySerializer(serializers.ModelSerializer):
    """
    Serializer for managing comment hierarchy relationships.
    """

    class Meta:
        model = CommentHierarchyTable
        fields = ['original_comment', 'descendant_comment', 'depth']

    def create(self, validated_data):
        new_hierarchy = CommentHierarchyTable(**validated_data)
        new_hierarchy.save()
        return new_hierarchy


class PayloadReplySerializer(serializers.Serializer):
    """
    Serializer for handling comment reply payloads.
    """

    new_comment = CreateCommentSerializer()
    hierarchy_item = CreateCommentHierarchySerializer()

    def create(self, validated_data):
        # Extract nested data
        new_comment = validated_data.pop('new_comment')
        comment_hierarchy = validated_data.pop('metadata')

        comment_serializer = CreateCommentSerializer(new_comment)
        if not comment_serializer.is_valid():
            return None

        new_comment_instance = comment_serializer.save()
        comment_hierarchy["descendant_comment"] = new_comment_instance.id
        
        comment_hierarchy_serializer = (
            CommentHierarchySerializer(**comment_hierarchy)
        )
        if not comment_hierarchy_serializer.is_valid():
            return None

        new_hierarchy_instance = comment_hierarchy_serializer.save()
        return [new_comment_instance, new_hierarchy_instance]


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
