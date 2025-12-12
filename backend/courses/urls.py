from django.urls import path
from .views import (
    CourseAuthorCreateViews
)

urlpatterns = [
    path('me/', CourseAuthorCreateViews.as_view()),

]