from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>', views.GetPostsView.as_view()),
    path('forum/<int:class_id>', views.BatchPostsView.as_view()),
]