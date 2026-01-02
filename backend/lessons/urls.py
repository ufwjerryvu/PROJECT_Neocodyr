from django.urls import path, include
from .views import (
    LectureCreateView,
    ProblemCreateView
)

urlpatterns = [
    path('<int:lesson_id>/lectures/', LectureCreateView.as_view()),
    path('<int:lesson_id>/problems/', ProblemCreateView.as_view())
]