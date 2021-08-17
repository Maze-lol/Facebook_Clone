from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from facebook.models import User, Users
from rest_framework import serializers, viewsets, permissions
from .serializer import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status


class FbViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


    