from rest_framework import serializers
from .models import Class
import re

def validate_bigint_format(value: str) -> str:
    if not re.fullmatch(r"^\d+$", value):
        # not a valid integer string
        raise ValueError("Value must be an integer")
    return int(value)
 
class ClassSerializer(serializers.ModelSerializer):
    """
    This is to fetch all the classes that the user is currently enrolled in.
    """
    class Meta:
        model = Class
        fields = ["id", "title", "description", "is_public", "created_id", "author_id"]

    def create(self, validated_data):
        class_entry = ClassSerializer(**validated_data)
        class_entry.save()
        return class_entry
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.is_public = validated_data.get("is_public", instance.is_public)
        instance.save()
        return instance
        
class GetPrivateClassSerializer(serializers.Serializer):
    """
    This is to fetch all the private classes that the user is currently enrolled in.
    """
    user_id = serializers.IntegerField(
        required=True,
        allow_blank=False,
        validator=[validate_bigint_format]
    )