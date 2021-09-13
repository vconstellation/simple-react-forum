from rest_framework import serializers
from .models import Category, Thread, Post
from django.contrib.auth.models import User

class CategoryListSerializer(serializers.ModelSerializer):

    threads_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_threads_count(self, obj):
        threads_count = Thread.objects.filter().count()
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
    class Meta:
        model = Thread
        fields = '__all__'

#Helper class
class ThreadPostSerializer(serializers.ModelSerializer):
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

