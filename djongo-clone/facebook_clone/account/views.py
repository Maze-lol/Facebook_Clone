from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from facebook.models import User, Users
from rest_framework import serializers, viewsets, permissions
from .serializer import CreateUsersSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status

class CreateUserAPiView(CreateAPIView):
    permissions_classes = [permissions.AllowAny]
    serializer_class = CreateUsersSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response(
            {**serializer.data},
           status=status.HTTP_201_CREATED,    
        )

class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)