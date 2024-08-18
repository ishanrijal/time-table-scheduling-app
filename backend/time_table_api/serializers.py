from rest_framework import serializers
from .models import (
    CustomUser, Classroom, Module,
    Lecture, Event, Notification, Conflict, Batch, Faculty,
)
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'password', 'batch', 'faculty', 'is_staff', 'is_active']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(username=email, password=password)

            if user:
                return {'user': user}
            else:
                raise serializers.ValidationError('Invalid email or password')
        raise serializers.ValidationError('Both email and password are required')

        
class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['id', 'room_name', 'capacity', 'availability']

class ModuleSerializer(serializers.ModelSerializer):
    # instructor = serializers.StringRelatedField()  # To show the instructor's name instead of the ID
    instructor = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='instructor'))

    class Meta:
        model = Module
        fields = ['id', 'module_code', 'module_name', 'credit_hours', 'instructor', 'room', 'time_slot', 'mode_of_delivery']

class LectureSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='instructor'))
    class Meta:
        model = Lecture
        fields = ['id', 'module', 'classroom', 'start_time', 'end_time', 'day_of_week', 'batch', 'faculty','user']

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
        fields = ['id', 'conflict_type', 'details', 'resolution_status', 'user']

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'year']

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name']