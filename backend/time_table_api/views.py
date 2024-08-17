from rest_framework import generics
from .models import CustomUser, Instructor, Course, Classroom, Module, Lecture, Event, Notification, Conflict
from .serializers import CustomUserSerializer, InstructorSerializer, CourseSerializer, ClassroomSerializer, ModuleSerializer, LectureSerializer, EventSerializer, NotificationSerializer, ConflictSerializer

from django.contrib.auth import authenticate, login as django_login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            django_login(request, user)
            # Generate a token or handle session if needed
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# CustomUser Views
class CustomUserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        # Custom action before saving the instance
        serializer.save()

class CustomUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def perform_update(self, serializer):
        # Custom action before saving the instance
        serializer.save()

# Instructor Views
class InstructorListCreateView(generics.ListCreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class InstructorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

# Course Views
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# Classroom Views
class ClassroomListCreateView(generics.ListCreateAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

class ClassroomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

# Module Views
class ModuleListCreateView(generics.ListCreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class ModuleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

# Lecture Views
class LectureListCreateView(generics.ListCreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer

class LectureDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer

# Event Views
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Notification Views
class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

# Conflict Views
class ConflictListCreateView(generics.ListCreateAPIView):
    queryset = Conflict.objects.all()
    serializer_class = ConflictSerializer

class ConflictDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Conflict.objects.all()
    serializer_class = ConflictSerializer