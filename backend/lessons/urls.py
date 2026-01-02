from django.urls import path, include
from .views import (
    LectureCreateView
)

urlpatterns = [
    path("<int:lesson_id>/lectures/", LectureCreateView.as_view())
]