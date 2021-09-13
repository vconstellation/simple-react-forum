from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.utils.text import slugify

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # avatar = models.ImageField(default='default.jpg', upload_to='profile_av',)

    slug = models.SlugField(null=True, unique=True)

    bio = models.TextField(max_length=450)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.username)
        super(Profile, self).save(*args, **kwargs)

        #resize and save avatar
        # img = Image.open(self.avatar.path)

        # if img.height > 300 or img.width > 300:
        #     output_size = (300, 300)
        #     img = Image.open(self.avatar.path).resize(output_size)
        #     img.thumbnail(output_size)
        #     img.save(self.avatar.path)