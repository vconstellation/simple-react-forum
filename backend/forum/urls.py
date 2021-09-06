from django.conf.urls import url 
from django.urls import include, path
from django.contrib import admin

from .views import CategoryListAPIView, CategoryDetailAPIView, ThreadDetailAPIView, ThreadListAPIView, PostListAPIView

urlpatterns = [
    path('', CategoryListAPIView.as_view(), name='category-list'),
    path('category/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('threads/', ThreadListAPIView.as_view(), name='thread-list'),
    path('threads/<int:pk>/', ThreadDetailAPIView.as_view(), name='thread-detail'),
    path('posts/', PostListAPIView.as_view(), name='post-list'),
]