from django.shortcuts import render
from .serializer import UserSerializer
from .models import User
from django.http import JsonResponse
from rest_framework.parsers import JSONParser





def post_list(request):
    if request.method == 'GET':
        posts = User.objects.all()
        serializer = UserSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


