from django.db import models
from users.models import User

class Class(models.Model):
    """
    The model for a class/unit. Each classroom can have as little as zero 
    students and as many students as they want. Same for instructors. The
    attribute `is_public` lets the author decide whether they want to make
    the class publicly explorable or if it's invite-only. 
    """

    title = models.CharField(max_length=256, null=False)
    description = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Author is automatically an instructor. Checks needed. 
    author = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    instructors = models.ManyToManyField(User)
    students = models.ManyToManyField(User)
    is_public = models.BooleanField(default=True)

    class Meta:
        db_table = "Classes"
        verbose_name = "Class"
        verbose_name_plural = "Classes"

class Lesson(models.Model):
    """
    Model for a lesson. Lesson is just pure text but supports MD and LaTeX.
    Each lesson currently belongs to a class but could belong to multiple
    classes in the future. Could also extend lessons to be other types of
    assessments like quizzes.
    """

    title = models.CharField(null=False, max_length=256)
    content = models.TextField(null=False)

    class Meta:
        db_table = "Lessons"
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"