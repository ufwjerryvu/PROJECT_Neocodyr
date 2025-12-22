from django.db import models
from django.contrib.auth.models import AbstractUser

def user_avatar_path(instance, filename):
    """
    Defines avatar (profile picture) path for users based on their ID.
    """
    return f"users/{instance.id}/avatar/{filename}"

class User(AbstractUser):
    """
    Extends Django's AbstractUser with role-based access and OAuth support.
    Supports both JWT authentication and social login via Account model.
    """
    
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to=user_avatar_path, blank=True, null=True)
    verified = models.DateTimeField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    # Triggers whenever model is saved
    last_updated = models.DateTimeField(auto_now=True) 

    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        USER = "user", "User"
        INSTRUCTOR = "instructor", "Instructor"
        STUDENT = "student", "Student"
        AUTHOR = "author", "Author"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.USER)

    class Meta:
        db_table = "Users"
        verbose_name = "User"
        verbose_name_plural = "Users"

class Account(models.Model):
    """
    Links users to OAuth providers (Google, Facebook, GitHub, etc.).
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    provider = models.CharField(max_length=50)
    provider_account_id = models.CharField(max_length=1024)

    class Meta:
        db_table = "Accounts"
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
        unique_together = [["provider", "provider_account_id"]]