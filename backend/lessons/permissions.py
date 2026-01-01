from rest_framework.permissions import BasePermission
from users.models import User
from courses.models import Lesson, Course

class IsAuthor(BasePermission):
    """
    Checks if the user is the author assigned to the course and thus is permit-
    ted to access operations. 
    """

    def has_permission(self, request, view):
        lesson_id = view.kwargs.get("lesson_id")
        lesson = Lesson.objects.get(id=lesson_id)
        return request.user == lesson.course.author