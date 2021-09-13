from django.db import models
from django.contrib.auth.models import User
from django.utils.text import Truncator

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=30)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.slug


class Thread(models.Model):
    thread_name = models.CharField(max_length=30)
    last_updated = models.DateTimeField(auto_now_add=True)
    thread_author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.thread_name

    def get_latest_post_author(self):
        username = Post.objects.filter(thread=self).order_by('-created_at')[:1]
        return username





class Post(models.Model):
    msg = models.TextField(max_length=4000)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    post_author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        truncated_msg = Truncator(self.msg)
        return truncated_msg.chars(20)

    def post_author_name(self):
        return self.post_author.username