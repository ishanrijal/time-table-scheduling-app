from rest_framework import serializers
from .models import CustomUser, Instructor, Course, Classroom, Module, Lecture, Event, Notification, Conflict

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    batch = serializers.IntegerField(required=False, allow_null=True)
    faculty = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'password', 'created_date', 'is_active', 'is_staff', 'batch', 'faculty']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Extract password
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)  # Hash password
            user.save()
        return user

    def update(self, instance, validated_data):
        # Extract password
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)  # Hash password
            user.save()
        return user

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ConflictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conflict
        fields = '__all__'