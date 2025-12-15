from django.db import models
from rest_framework import serializers
from users.models import User

class Room(serializers.ModelSerializer):
    name = models.CharField(max_length=256)
    room_recieve_key = models.BinaryField()
    created_at = models.DateTimeField(nullable=False, blank=False)
    type = models.CharField(max_length=256)
    user = models.ForeignKey(User, nullable=False, blank=False)
         
class Keys(serializers.ModelSerializer): 
    room_recieve_key = models.BinaryField()
    created_at = models.DateTimeField(nullable=False, blank=False)
    updated_at = models.DateTimeField()
    user = models.ForeignKey(User, nullable=False, blank=False)
    room = models.ForeignKey(Room, nullable=False, blank=False)