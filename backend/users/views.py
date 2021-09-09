from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

#Create User view
class UserCreateView(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#class for blacklisting tokens while user logs out
class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            print(token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


#check if user is logged in-view
class IsUserLoggedIn(APIView):
    def get(self, request):
        return Response(status=status.HTTP_200_OK)