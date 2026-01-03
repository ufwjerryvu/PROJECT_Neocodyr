from rest_framework.permissions import BasePermission
from courses.models import Lesson
from .models import Lecture, Problem
from rest_framework.exceptions import NotFound

class IsAuthorViaLesson(BasePermission):
    """
    Checks if the user is the author assigned to the course and thus is permit-
    ted to access operations. 
    """

    def has_permission(self, request, view):
        lesson_id = view.kwargs.get("lesson_id")
        try:
            lesson = Lesson.objects.get(id=lesson_id)
        except Lesson.DoesNotExist:
            raise NotFound()
        
        return request.user == lesson.course.author
    
class IsAuthorViaLecture(BasePermission):
    """
    Checks if the user is the course author via lecture ID.
    """

    def has_permission(self, request, view):
        lecture_id = view.kwargs.get("lecture_id")
        try:
            lesson = Lecture.objects.get(id=lecture_id).lesson
        except Lecture.DoesNotExist:
            raise NotFound()
        
        return request.user == lesson.course.author

class IsAuthorViaProblem(BasePermission):
    """
    Checks if the user is the course author via problem ID.
    """

    def has_permission(self, request, view):
        problem_id = view.kwargs.get("problem_id")

        try:
            lesson = Problem.objects.get(id=problem_id).lesson
        except Problem.DoesNotExist:
            raise NotFound()
        
        return request.user == lesson.course.author