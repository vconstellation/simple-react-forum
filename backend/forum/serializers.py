from django.core.paginator import Paginator
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
    # commented out posts were the original, un-paginated version of the code
    # posts = ThreadPostSerializer(many=True, read_only=True)
    posts = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ['thread_name', 'posts']

    # since the default django rest framework pagination doens't work with merged / nested serializers
    # i had to write my own pagination functionality
    def get_posts(self, obj):
        page_size = self.context['request'].query_params.get('size') or 4
        paginator = Paginator(obj.posts.all(), page_size)
        page = self.context['request'].query_params.get('page') or 1

        result = paginator.page(page)
        serializer = ThreadPostSerializer(result, many=True)

        return serializer.data

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
        fields = ['pk', 'username']

#create post class test
class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CreateThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = '__all__'

#update post

class UpdatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    #override the update in order to
    #intercept the data sent by the axios
    #and check whether the user editing the post
    #is the same as the post's author

    #this also should raise some error
    #but for now it will do
    def update(self, instance, validated_data):
        updating_user = validated_data.get('post_author')
        if (updating_user == instance.post_author):
            return super().update(instance, validated_data)