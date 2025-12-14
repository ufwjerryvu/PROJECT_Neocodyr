from django.urls import path
from . import views

urlpatterns = [
    path('post', views.ReactsPostView.as_view()),
    path('post/<int:post_id>', views.ReactsPostView.as_view()),
    path('comment', views.ReactsCommentView.as_view()),
    path('comment/<int:comment_id>', views.ReactsCommentView.as_view()),
]