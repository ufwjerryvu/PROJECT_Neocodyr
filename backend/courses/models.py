from django.db import models
from users.models import User

def course_thumbnail_path(instance, filename):
    """
    Defines the thumbnail path for a course. 
    """
    return f"courses/{instance.id}/thumbnail/{filename}"

class Course(models.Model):
    """
    The model for a course. Each course can have as little as zero 
    students and as many students as they want. Same for instructors. The
    attribute `is_public` lets the author decide whether they want to make
    the course publicly explorable or if it's invite-only. 
    """

    title = models.CharField(max_length=256, null=False)
    description = models.TextField(null=False, max_length=1024)
    created_at = models.DateTimeField(auto_now_add=True)
    thumbnail = models.ImageField(
        upload_to=course_thumbnail_path,
        null=True, 
        blank=True)

    # Author is automatically an instructor. Checks needed. 
    author = models.ForeignKey(User, null=False, on_delete=models.CASCADE,
                            related_name="authored_courses")
    instructors = models.ManyToManyField(User, related_name="teaching_courses")
    students = models.ManyToManyField(User, related_name="enrolled_courses")
    is_public = models.BooleanField(default=True)

    class Meta:
        db_table = "Courses"
        verbose_name = "Course"
        verbose_name_plural = "Courses"

class Lesson(models.Model):
    """
    Model for a lesson. Each lesson represents a session where a mix of lectures,
    problems, and quizzes a grouped together to convey a topic. 
    """

    title = models.CharField(null=False, max_length=256)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    @classmethod
    def get_next_order(cls, course):
        """
        Gets the maximum order in the database and returns the next index. Use-
        ful when creating a lesson and the order matters. 
        """
        max_order = cls.objects.filter(course=course).aggregate(
            models.Max("order")
        )["order__max"]

        return (max_order or 0) + 1

    class Meta:
        db_table = "Lessons"
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"
        unique_together = [["course", "order"]]