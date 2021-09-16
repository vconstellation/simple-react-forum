from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile





#Profile serializer
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['bio']


#Registering a new user
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    #this is called when the create user view does the 'post' method
    def create(self, validated_data):
        password = validated_data.pop('password')
        # user = User(**validated_data)
        # user.set_password(password)
        # user.save()
        user = User.objects.create(
            username = validated_data['username'],
            password = password,
        )

        profile_data = validated_data.pop('profile')
        profile = Profile.objects.create(
            user = user,
            # avatar = profile_data['avatar'],
            bio = profile_data['bio'],
        )

        return user