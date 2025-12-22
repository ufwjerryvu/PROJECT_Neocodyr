from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>', views.CommentGetView.as_view()), # GET
    path('<int:comment_id>', views.CommentUpdateView.as_view()), # PATCH
    path('comment', views.ReplyCommentView.as_view()), # POST
    path('post', views.ReplyPostView.as_view()) # POST
]