from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPiView, LoginAPI, LogoutUserAPIView

urlpatterns = [
    
    url(r'^auth/register/$',
        CreateUserAPiView.as_view(),
        name='register'),
    url(r'^auth/login/$',
        LoginAPI.as_view(),
        name='login'),
    url(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='logout'),
]