from django.urls import path
from .views import (
    CourseAuthorCreateViews
)

urlpatterns = [
    path('authors/me/', CourseAuthorCreateViews.as_view()),

]