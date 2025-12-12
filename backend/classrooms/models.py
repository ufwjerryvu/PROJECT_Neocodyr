from django.db import models
from users.models import User

class Classroom(models.Model):
    """
    The model for a class/unit. Each classroom can have as little as zero 
    students and as many students as they want. Same for instructors. The
    attribute `is_public` lets the author decide whether they want to make
    the class publicly explorable or if it's invite-only. 
    """

    title = models.CharField(max_length=256, null=False)
    description = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Author is automatically and instructor. Checks needed. 
    author = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    instructors = models.ManyToManyField(User)
    students = models.ManyToManyField(User)
    is_public = models.BooleanField(default=True)

    class Meta:
        db_table = "Classrooms"
        verbose_name = "Classroom"
        verbose_name_plural = "Classrooms"

class Lesson(models.Model):
    """
    Model for a lesson. Each lesson represents a session where a mix of lectures,
    problems, and quizzes a grouped together to convey a topic. 
    """

    title = models.CharField(null=False, max_length=256)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Lessons"
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"