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


class PostUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for post update operations.
    """

    class Meta:
        model = Posts
        fields = ["id", "content", "author_id"]


class BatchReadPostsSerializer(serializers.ModelSerializer):
    """
    Serializer for batch reading posts.
    """

    class Meta:
        model = Posts
        fields = ["title", "content", "likes", "author_id"]
        