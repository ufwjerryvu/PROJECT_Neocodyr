from django.urls import path
from .views import (
    CourseAuthorCreateView,
    CourseDetailView
)

urlpatterns = [
    path('authors/me/', CourseAuthorCreateView.as_view()),
    path('<int:course_id>/', CourseDetailView.as_view()),
]