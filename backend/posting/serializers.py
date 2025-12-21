from rest_framework import serializers
from .models import Posts
from datetime import datetime

class PostsSerializer(serializers.ModelSerializer):
    """
    Serializer for reading and updating posts.
    """

    class Meta:
        model = Posts
        fields = [
            "id", "title", "content", "likes", "created_at",
            "updated_at", "author_id"
        ]

    def update(self, instance, validated_data):
        instance.content = validated_data.get("content", instance.content)
        instance.updated_at = f"{datetime.now()}"
        instance.save()
        return instance

class CreatePostsSerializer(serializers.ModelSerializer):
    """
    Serializer for reading and updating posts.
    """
    class Meta:
        model = Posts
        fields = [
            "id", "title", "content", "likes", "created_at",
            "updated_at", "author_id"
        ]
    
    def create(self, validated_data):
        post = Posts.objects.create(
            title=validated_data.get("title"),
            content=validated_data.get("content"),
            likes=validated_data.get("likes", 0),
            course_id=validated_data.get("course_id"),
            author_id=validated_data.get("author_id"),
            created_at=f"{datetime.now().strftime('%d/%m/%y %H:%M')}"
        )
        return post

class PostUpdateSerializer(serializers.ModelSerializer):
    """
    Payload serializer for post update operations.
    """

    class Meta:
        model = Posts
        fields = ["id", "content", "author_id"]


class BatchReadPostsSerializer(serializers.ModelSerializer):
    """
    Payload serializer for batch reading posts.
    """

    class Meta:
        model = Posts
        fields = ["title", "content", "likes", "author_id"]
        