from rest_framework import serializers
from rest_framework.relations import SlugRelatedField
from .models import Category, Thread, Post
from django.contrib.auth.models import User

class CategoryListSerializer(serializers.ModelSerializer):

    threads_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    #this returns the no. of threads in the category
    def get_threads_count(self, obj):
        threads_count = Thread.objects.filter(category=obj).count()
        return threads_count

class CategoryDetailSerializer(serializers.ModelSerializer):
    threads = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_threads(self, obj):

        def get_detail(thread):
            return {
                'id': thread.id,
                'name': thread.thread_name,
                'last_updated': thread.last_updated,
            }

        try:
            threads = Thread.objects.filter(category=obj)
            return map(get_detail, threads)
        except:
            return []

class ThreadListSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field = 'category', read_only=True)

    class Meta:
        model = Thread
        fields = ['thread_name', 'last_updated', 'thread_author', 'category']

#Helper class
class ThreadPostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.post_author_name()

    class Meta:
        model = Post
        fields = '__all__'

class ThreadDetailSerializer(serializers.ModelSerializer):
    posts = ThreadPostSerializer(many=True, read_only=True)


    class Meta:
        model = Thread
        fields = ['thread_name', 'posts']

class PostListSerializer(serializers.ModelSerializer):
    thread = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='thread-detail',
    )

    class Meta:
        model = Post
        fields = '__all__'

#Fetch current logged in user
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk']

#create post class test
class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CreateThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = '__all__'