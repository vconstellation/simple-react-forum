from django.conf.urls import url 
from django.urls import include, path
from django.contrib import admin

from .views import CategoryListAPIView, CategoryDetailAPIView, ThreadDetailAPIView, ThreadListAPIView, PostListAPIView, ThreadCreateAPIView, PostCreateAPIView, PostUpdateAPIView, current_user

urlpatterns = [
    path('', CategoryListAPIView.as_view(), name='category-list'),
    path('category/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('threads/', ThreadListAPIView.as_view(), name='thread-list'),
    path('threads/<int:pk>/', ThreadDetailAPIView.as_view(), name='thread-detail'),
    path('posts/', PostListAPIView.as_view(), name='post-list'),
    #CRUD paths
    path('threads/create_new/', ThreadCreateAPIView.as_view(), name='thread-create'),
    path('posts/create_new/', PostCreateAPIView.as_view(), name='post-create'),
    path('posts/update/<int:pk>/', PostUpdateAPIView.as_view(), name='post-update'),
    #Fetch current username
    path('user/', current_user, name='current-user'),
]