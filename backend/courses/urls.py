from django.urls import path
from .views import (
    CourseAuthorCreateView,
    CourseDetailView,
    CourseThumbnailDetailView
)

urlpatterns = [
    path('authors/me/', CourseAuthorCreateView.as_view()),
    path('<int:course_id>/', CourseDetailView.as_view()),
    path('<int:course_id>/thumbnail/', CourseThumbnailDetailView.as_view())
]