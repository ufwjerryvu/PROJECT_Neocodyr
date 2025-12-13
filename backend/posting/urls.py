from django.urls import path
from . import views

urlpatterns = [
    path('<int:post_id>', views.GetPostsView.as_view()), # GET
    path('batch/<int:course_id>', views.BatchPostsView.as_view()), # GET
    path('post', views.CreatePostView.as_view()), # POST
    path('post/<int:post_id>', views.UpdatePostsView.as_view()), # PATCH
    
]