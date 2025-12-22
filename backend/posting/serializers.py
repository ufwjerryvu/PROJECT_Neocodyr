from rest_framework import serializers
from .models import Posts
from datetime import datetime

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for reading and creating posts.
    """
    class Meta:
        model = Posts
        fields = [
            "id", "title", "content",
            "course_id", "author_id"
        ]
        read_only_fields = ["id"]
    
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
        read_only_fields = ["id"]

    def update(self, instance, validated_data):
        instance.content = validated_data.get("content", instance.content)
        instance.updated_at = f"{datetime.now()}"
        instance.save()
        return instance

class BatchReadPostsSerializer(serializers.ModelSerializer):
    """
    Payload serializer for batch reading posts.
    """

    class Meta:
        model = Posts
        fields = ["id", "title", "content", "likes", "author_id"]
        read_only_fields = ["id"]
        