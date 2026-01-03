from rest_framework import serializers
from .models import LessonItem, Lecture, Problem, Lesson
from django.contrib.contenttypes.models import ContentType
from .constants import *

def validate_test_script(value: str) -> str:
    """
    Validates test script contains required functions and proper Python syntax.
    This is currently left as work for later. 
    """
    valid = True
    if not valid:
        raise serializers.ValidationError(
            "The test script for the given problem is not valid"
        )
        
    return value

def validate_memory_limit(value: int) -> int:
    """
    Validates memory limit is non-negative and within maximum allowed limit.
    """

    if value < 0:
        raise serializers.ValidationError(
            "The memory limit cannot be less than zero. It can only "
            "be zero (maximum limit) or a positive integer."
        )
    elif value > MAX_MEM_LIMIT_MB:
        raise serializers.ValidationError(
            f"The maximum memory limit is {MAX_MEM_LIMIT_MB} "
            " megabytes"
        )
    
    # If user set to zero then we set it as a maximum limit
    if value == 0:
        return MAX_MEM_LIMIT_MB
    
    return value

def validate_time_limit(value: int) -> int:
    """
    Validates time limit is non-negative and within maximum allowed limit.
    """
    if value < 0:
        raise serializers.ValidationError(
            "The time limit cannot be less than zero. It can only "
            "be zero (maximum limit) or a positive integer."
        )
    elif value > MAX_TIME_LIMIT_MS:
        raise serializers.ValidationError(
            f"The maximum time limit is {MAX_TIME_LIMIT_MS} "
            " milliseconds"
        )
    
    if value == 0:
        return MAX_TIME_LIMIT_MS
    
    return value

class LectureDetailsSerializer(serializers.ModelSerializer):
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

class ProblemDetailsSerializer(serializers.ModelSerializer):
    """
    Creates problems with automatic ordering within a lesson and validates prob-
    lem constraints (time/memory limits, test scripts).
    """

    order = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    memory_limit_mb = serializers.IntegerField(
        required=False,
        validators=[
            validate_memory_limit
        ]
    )

    time_limit_ms = serializers.IntegerField(
        required=False,
        validators=[
            validate_time_limit
        ]
    )

    test_script = serializers.CharField(
        required=False,
        validators=[
            validate_test_script
        ]
    )

    def get_order(self, obj):
        item = LessonItem.objects.get(
            content_type=ContentType.objects.get_for_model(Problem),
            object_id=obj.id
        )

        return item.order
    
    def get_content_type(self, obj):
        return "problem"
    
    class Meta:
        model = Problem
        fields = ["id", "title", "description", "starter_code",
                  "time_limit_ms", "memory_limit_mb",
                  "test_script", "reward", "created_at",
                  "updated_at", "order", "content_type"]
        
        read_only_fields = ["id", "created_at", "updated_at",
                            "order", "content_type"]
    
    def create(self, validated_data):
        lesson = Lesson.objects.get(id=self.context["lesson_id"])

        validated_data["lesson"] = lesson
        problem = Problem.objects.create(**validated_data)

        LessonItem.objects.create(
            lesson=lesson,
            order=LessonItem.get_next_order(lesson.id),
            content_type=ContentType.objects.get_for_model(Problem),
            object_id=problem.id
        )

        return problem
    