from rest_framework import serializers
from .models import User
from datetime import timedelta
from django.utils import timezone
from rest_framework.validators import UniqueValidator
from .models import User
import re
import os

def validate_username_format(value: str) -> str:
    """
    Validator to check if username only contains alphanumeric characters, 
    dashes, underscores, and periods.
    """

    if not re.match(r"^[A-Za-z0-9._-]+$", value):
        raise serializers.ValidationError(
            "Username can only contain letters, numbers, underscores, hyphens, "
            "and periods"
        )
    
    return value


def validate_name_format(value: str) -> str:
    """
    Enforces name fields (i.e., first name and last name) cannot have anything
    other than letters, apostrophes, spaces, and hyphens.
    """

    if not re.match(r"^[A-Za-z\"\s-]+$", value):
        raise serializers.ValidationError(
            "Name field can only contain letters, apostrophes, spaces, and hyphens"
        )

    return value

def validate_update_cooldown(user: User) -> None:
    """
    Lets the user update their information only after 7 days.
    """

    if user.last_updated + timedelta(seconds=7) > timezone.now():
        raise serializers.ValidationError(
            "Must wait the full 7 days to update details again."
        )
                  
class UserReadSerializer(serializers.ModelSerializer):
    """
    This is to fetch all the user"s basic information. Mostly for the profile page
    but also for frontend authentication context purposes.
    """

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", 
                    "bio", "date_joined", "role", "image"]
        
class UserCreateSerializer(serializers.ModelSerializer):
    """
    This is the serializer to create a user via the register page and unauthen-
    ticated. 
    """

    username = serializers.CharField(
        required=True, 
        allow_blank=False, 
        validators=[
            validate_username_format,
            UniqueValidator(queryset=User.objects.all())
        ]
    )
    
    first_name = serializers.CharField(
        required=True, 
        allow_blank=False,
        validators=[validate_name_format]
    )
    last_name = serializers.CharField(
        required=True, 
        allow_blank=False,
        validators=[validate_name_format]
    )

    email = serializers.EmailField(
        required=True,
        allow_blank=False,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ]
    )
    
    password = serializers.CharField(required=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    """
    This is the serializer used to update the user information mostly on the 
    profile page. 
    """

    username = serializers.CharField(
        allow_blank=False,
        validators=[
            validate_username_format,
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    first_name = serializers.CharField(
        allow_blank=False,
        validators=[
            validate_name_format
        ]
    )

    last_name = serializers.CharField(
        allow_blank=False,
        validators=[
            validate_name_format
        ]
    )

    email = serializers.EmailField(
        allow_blank=False,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    def validate(self, attrs):
        validate_update_cooldown(self.instance)
        return attrs

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "bio"]
        
class UserAvatarUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer that only allows user to upload a profile picture
    image. 
    """
    def update(self, instance, validated_data):
        # Delete old
        if instance.image:
            instance.image.delete(save=False)
        
        # Update new
        instance.image = validated_data.get("image")
        instance.save(update_fields=["image"])
        
        return instance

    class Meta:
        model = User
        fields = ["image"]
