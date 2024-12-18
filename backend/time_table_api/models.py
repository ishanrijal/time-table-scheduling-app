from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

# Custom User Manager
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.conf import settings
from django.db import models
import binascii
import os


class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, role, password=None, batch=None, faculty=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            role=role,
            created_date=timezone.now(),
            batch=batch,
            faculty=faculty
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, batch=None, faculty=None):
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            role='admin',
            password=password,
            batch=batch,
            faculty=faculty
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
        ('student', 'Student'),
    ]

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    created_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    batch = models.IntegerField(blank=True, null=True)
    faculty = models.CharField(max_length=100, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Batch(models.Model):
    year = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.year)

class Faculty(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Classroom(models.Model):
    room_name = models.CharField(max_length=255)
    capacity = models.IntegerField()
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.room_name} (Capacity: {self.capacity})"

class Module(models.Model):
    module_code = models.CharField(max_length=10)
    module_name = models.CharField(max_length=255)
    credit_hours = models.IntegerField()
    instructor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='instructor', limit_choices_to={'role': 'instructor'})
    room = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='rooms', blank=True, null=True)
    time_slot = models.DateTimeField(default=timezone.now)
    MODE_OF_DELIVERY_CHOICES = [
        ('online', 'Online'),
        ('physical', 'Physical')
    ]
    mode_of_delivery = models.CharField(max_length=10, choices=MODE_OF_DELIVERY_CHOICES)

    def __str__(self):
        return self.module_name
    
class Lecture(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lectures')
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='lectures', blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    day_of_week = models.CharField(max_length=9)
    batch = models.IntegerField(null=True, blank=True)
    faculty = models.CharField(max_length=255, null=True, blank=True) 
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='lectures', null=True, blank=True)

    def __str__(self):
        return f"{self.module.module_name} - {self.day_of_week}"

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return self.title

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.email} - {self.event.title}"

# Conflict Management
class Conflict(models.Model):
    CONFLICT_TYPE_CHOICES = [
        ('schedule', 'Schedule Conflict'),
        ('resource', 'Resource Conflict'),
    ]

    conflict_type = models.CharField(max_length=10, choices=CONFLICT_TYPE_CHOICES)
    details = models.TextField()
    resolution_status = models.CharField(max_length=10, choices=[('resolved', 'Resolved'), ('pending', 'Pending')])
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='conflicts', blank=True, null=True)

    def __str__(self):
        return f"{self.conflict_type} - {self.resolution_status}"
    
class CustomToken(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='custom_auth_token',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Custom Token"
        verbose_name_plural = "Custom Tokens"
    def generate_key():
        """Generate a new token key."""
        return binascii.hexlify(os.urandom(20)).decode()