from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>', views.GetPostsView.as_view()),
    path('forum/<int:course_id>', views.BatchPostsView.as_view()),
    path('create', views.CreatePostView.as_view()),
    path('update/<int:post_id>', views.UpdatePostsView.as_view()),
    
]