from rest_framework import serializers
from .models import Course
from users.models import User

class AuthorMinimalReadSerializer(serializers.ModelSerializer):
    """
    Just includes minimal information for read/display purposes.
    """

    class Meta:
        model = User
        fields = ["id", "name", "image"]

class CourseCreateSerializer(serializers.ModelSerializer):
    """
    Allows only an author to create it. 
    """

    title = serializers.CharField(allow_blank=False)
    description = serializers.CharField(allow_blank=False)

    class Meta:
        model = Course
        fields = ["id", "title", "description", "thumbnail", "author_id", "is_public"]

class CourseOverviewReadSerializer(serializers.ModelSerializer):
    """
    Lets anyone read it but gives displayable overview, not a detailed response.
    """
    author = AuthorMinimalReadSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ["title", "description", "is_public", "author"]