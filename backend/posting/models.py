from django.db import models
from courses.models import Course
from users.models import User


class Posts(models.Model):
    """
    Represents a post within a course forum.
    """

    title = models.CharField(max_length=512)
    content = models.TextField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    course_id = models.ForeignKey(
        Course,
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    author_id = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = "Posts"
        verbose_name = "Post"
        verbose_name_plural = "Posts"