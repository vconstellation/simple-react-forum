from django.db.models import query
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from .serializers import CategoryListSerializer, CategoryDetailSerializer, ThreadListSerializer, ThreadDetailSerializer, PostListSerializer
from .models import Category, Thread, Post

# Create your views here.

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer

class CategoryDetailAPIView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'

class ThreadListAPIView(ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadListSerializer

class ThreadDetailAPIView(RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDetailSerializer

class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer