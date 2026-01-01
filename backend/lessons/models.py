from django.db import models
from courses.models import Lesson
from django.contrib.contenttypes.fields import GenericForeignKey

class LessonItem(models.Model):
    """
    Abstract ordering mechanism for lesson content to avoid race conditions
    by only using computational methods. Ensures unique ordering across all
    content types within a lesson.
    """

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    order = models.IntegerField(null=False)
    content_type = models.ForeignKey("contenttypes.ContentType", on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        unique_together = [["lesson", "order"]]
        ordering = ["order"]

class Lecture(models.Model):
    """
    Model for a lecture within a lesson. Contains educational content 
    presented to students in a specific order.
    """
    
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    title = models.CharField(max_length=256, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Lectures"
        verbose_name = "Lecture"
        verbose_name_plural = "Lectures"

class Problem(models.Model):
    """
    Model for a coding problem within a lesson. Students submit solutions
    that are tested against test scripts with time and memory constraints.
    """

    title = models.CharField(max_length=256, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    starter_code = models.TextField(null=True, blank=True)
    time_limit_ms = models.BigIntegerField(default=10000) # 10 seconds
    memory_limit_mb = models.BigIntegerField(default=64) # 64 megabytes
    test_script = models.TextField()
    reward = models.IntegerField(default=0)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Problems"
        verbose_name = "Problem"
        verbose_name_plural = "Problems"
