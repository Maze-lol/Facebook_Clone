from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    caption = models.CharField(max_length=500, blank=True)
    photo = models.FileField(blank=True, upload_to="upload")
    created_at = models.DateField(auto_now_add=True)
    like = models.IntegerField(default=0)
    comment = models.IntegerField(default=0)
    share = models.IntegerField(default=0)


class Users(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=10)
