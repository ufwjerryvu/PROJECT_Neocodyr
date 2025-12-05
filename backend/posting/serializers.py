from rest_framework import serializers
from .models import Posts

class PostsReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["id", "title", "content", "likes", "created_at",
                  "updated_at", "author_id"]
        
class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["content", "updated_at"]