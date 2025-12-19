from rest_framework import serializers
from .models import Course, Lesson
from users.models import User

class AuthorMinimalReadSerializer(serializers.ModelSerializer):
    """
    Just includes minimal information for read/display purposes.
    """

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "image"]

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
        fields = ["id", "title", "description", "thumbnail", "is_public", "author"]

class CourseSettingsUpdateSerializer(serializers.ModelSerializer):
    """
    Lets the author change course information.
    """
    class Meta:
        model = Course
        fields = ["title", "description", "thumbnail", "is_public"]

class LessonSerializer(serializers.ModelSerializer):
    """
    Allows the author to create a lesson. Automatically manages lesson order 
    during the creation process.
    """
    
    def create(self, validated_data):
        validated_data["order"] = Lesson.get_next_order(validated_data["course"])
        return super().create(validated_data)
    
    class Meta:
        model = Lesson
        fields = ["id", "title", "course", "order", "created_at"]
        read_only_fields = ["id", "course", "order", "created_at"]
