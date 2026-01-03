from django.urls import path, include
from .views import (
    LectureCreateView,
    LectureDetailsView,
    ProblemCreateView,
    ProblemDetailsView
)

urlpatterns = [
    path('<int:lesson_id>/lectures/', LectureCreateView.as_view()),
    path('<int:lesson_id>/problems/', ProblemCreateView.as_view()),
    path('lectures/<int:lecture_id>/', LectureDetailsView.as_view()),
    path('problems/<int:problem_id>/', ProblemDetailsView.as_view())
]