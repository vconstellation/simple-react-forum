from django.urls import path
from .views import UserCreateView, IsUserLoggedIn, LogoutAndBlacklistRefreshTokenForUserView, ProfileDetailAPIView, ProfileUpdateAPIView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    #create and obtain (login) jwt tokens
    path('obtain/', jwt_views.TokenObtainPairView.as_view(), name=('token_create')),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name=('token_refresh')),
    #create and login
    path('create/', UserCreateView.as_view(), name=('user_create')),
    #check if user is logged in
    path('logged_in/', IsUserLoggedIn.as_view(), name=('user_logged')),
    #blacklist token and logout
    path('logout/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name=('user_logout')),
    #profile and update profile
    path('profile/<slug:slug>/', ProfileDetailAPIView.as_view(), name=('profile-view')),
    path('profile/<slug:slug>/update/', ProfileUpdateAPIView.as_view(), name=('profile-update')),

]