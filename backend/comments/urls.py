from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>/comments', views.CommentGetView.as_view()), # GET
    path('<int:comment_id>', views.CommentUpdateView.as_view()), # PATCH
    path('comment/<int:comment_id>', views.ReplyCommentView.as_view()), # POST
    path('post/<int:comment_id>', views.ReplyPostView.as_view()) # POST
]