from django.db.models import fields
from rest_framework import serializers
from facebook.models import User
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = "__all__"
    
