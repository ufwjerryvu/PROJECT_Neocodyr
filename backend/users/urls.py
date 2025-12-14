from django.urls import path
from .views import UserUpdateView, UserAvatarUpdateView

urlpatterns = [
    path('me/', UserUpdateView.as_view()),
    path('me/avatar/', UserAvatarUpdateView.as_view())
]