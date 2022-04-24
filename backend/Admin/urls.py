from nturl2path import url2pathname
from django.urls import path
from . import views

urlpatterns = [
    
    path('images/', views.image_list, name='image_list'),
    path('images/<int:pk>/', views.image_detail, name='image_detail'),
    path('images/new/', views.image_create, name='image_create'),
    path('images/<int:pk>/edit/', views.image_update, name='image_update'),
    path('images/<int:pk>/delete/', views.image_delete, name='image_delete'),
]

