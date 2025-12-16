from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>', views.CommentGetView.as_view()),
    path('<int:comment_id>', views.CommentUpdateView.as_view()),
    path('reply/<int:comment_id>', views.ReplyCommentView.as_view()),
]