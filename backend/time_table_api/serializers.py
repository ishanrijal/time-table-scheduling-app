from rest_framework import serializers
from .models import (
    CustomUser, Classroom, Module,
    Lecture, Event, Notification, Conflict
)

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'created_date', 'is_active', 'is_staff', 'batch', 'faculty']

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['id', 'room_name', 'capacity', 'availability']

class ModuleSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField()  # To show the instructor's name instead of the ID

    class Meta:
        model = Module
        fields = ['id', 'module_code', 'module_name', 'credit_hours', 'instructor', 'room', 'time_slot', 'mode_of_delivery']

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['id', 'module', 'classroom', 'start_time', 'end_time', 'day_of_week', 'batch', 'faculty']

class EventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='instructor'))
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'start_time', 'end_time', 'user']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'event', 'message', 'sent_at', 'read']

class ConflictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conflict
        fields = ['id', 'conflict_type', 'details', 'resolution_status']