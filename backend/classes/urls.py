from django.urls import path
from . import views

urlpatterns = [
    path('public', views.GetClassesView.as_view()),
    path('private', views.GetClassesView.as_view()),
    path('create', views.ModifyClassView.as_view()),
    path('update/<int:class_id>', views.ModifyClassView.as_view()),
    path('remove/<int:class_id>', views.ModifyClassView.as_view())
]