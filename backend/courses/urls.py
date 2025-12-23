from django.urls import path
from .views import (
    CourseAuthorCreateView,
    CourseDetailView,
    CourseThumbnailDetailView,
    CourseLessonsView,
    LessonDetailView
)

urlpatterns = [
    path('authors/me/', CourseAuthorCreateView.as_view()),
    path('<int:course_id>/', CourseDetailView.as_view()),
    path('<int:course_id>/thumbnail/', CourseThumbnailDetailView.as_view()),
    path('<int:course_id>/lessons/', CourseLessonsView.as_view()),
    path('lessons/<int:lesson_id>/', LessonDetailView.as_view())
]