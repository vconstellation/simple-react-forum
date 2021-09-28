from django.db.models import query
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CategoryListSerializer, CategoryDetailSerializer, ThreadListSerializer, ThreadDetailSerializer, PostListSerializer, UserDetailSerializer, CreateThreadSerializer, CreatePostSerializer, UpdatePostSerializer
from .models import Category, Thread, Post



# Create your views here.

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer

class CategoryDetailAPIView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    # lookup_field = 'slug'

class ThreadListAPIView(ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadListSerializer

class ThreadDetailAPIView(RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadDetailSerializer

class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


##testing CRUD code of block

#Create

class ThreadCreateAPIView(CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = CreateThreadSerializer

    # def get_serializer(self, *args, **kwargs):
    #     serializer_class = self.get_serializer_class()
    #     kwargs['context'] = self.get_serializer_context()

    #     if (thread_name := self.request.data.get('thread_name')) and (category := self.request.data.get('category')):
    #         draft_request_data = self.request.data.copy()
    #         draft_request_data['thread_name'] = thread_name
    #         draft_request_data['category'] = category
    #         draft_request_data['category_id'] = category
    #         kwargs['data'] = draft_request_data
    #         return serializer_class(*args, **kwargs)


    #     return serializer_class(*args, **kwargs)

class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer

#Update block

class PostUpdateAPIView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = UpdatePostSerializer

#Fetching current, logged in user
@api_view(['GET'])
def current_user(request):
    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data)
