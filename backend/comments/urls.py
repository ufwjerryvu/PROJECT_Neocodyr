from django.urls import path
from . import views

url_patterns = [
    path('<int:post_id>', views.GetAllCommentsView.as_view()),
    path('reply/<int:comment_id>', views.ReplyCommentView.as_view()),
]