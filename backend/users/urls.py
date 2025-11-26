from django.urls import path
from .views import UserUpdateView

urlpatterns = [
    path('me/', UserUpdateView.as_view())
]