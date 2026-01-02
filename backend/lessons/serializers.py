from rest_framework import serializers
from .models import LessonItem, Lecture, Problem, Lesson
from django.contrib.contenttypes.models import ContentType

class LectureCreateSerializer(serializers.ModelSerializer):
    """
    Creates lectures with automatic ordering within a lesson.
    """

    order = serializers.SerializerMethodField()
    title = serializers.CharField(required=True, allow_blank=False)
    content = serializers.CharField(required=True, allow_blank=False)
    content_type = serializers.SerializerMethodField()

    def get_order(self, obj):
        # Search by lecture then ID after.
        item = LessonItem.objects.get(
            content_type=ContentType.objects.get_for_model(Lecture),
            object_id=obj.id
        )

        return item.order
    
    def get_content_type(self, obj):
        return "lecture"

    class Meta:
        model = Lecture
        fields = ["id", "title", "content", "created_at", 
                  "updated_at", "order", "content_type"]
        
        read_only_fields = ["id", "order", "created_at",
                            "updated_at", "content_type"]

    def create(self, validated_data):
        lesson = Lesson.objects.get(id=self.context["lesson_id"])

        # Add lesson to the dictionary because the lecture object requires it.
        validated_data["lesson"] = lesson
        lecture = Lecture.objects.create(**validated_data)

        # Creating this to keep the order of polymorphic lesson items.
        LessonItem.objects.create(
            lesson=lesson,
            order=LessonItem.get_next_order(lesson.id),
            content_type=ContentType.objects.get_for_model(Lecture),
            object_id=lecture.id
        )

        return lecture