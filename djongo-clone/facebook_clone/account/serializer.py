
from rest_framework import serializers

from django.contrib.auth import authenticate, get_user_model


class CreateUsersSerializer(serializers.ModelSerializer):   
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'email','password')
        write_only_fields = ('password')
    def create(self, validated_data):
        user =  super(CreateUsersSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

