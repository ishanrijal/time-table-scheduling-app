from django.db import models
from django.contrib.auth.models import User

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='instructor')
    name = models.CharField(max_length=255)
    hire_date = models.DateField()

    def __str__(self):
        return self.name

class Course(models.Model):
    course_code = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    credits = models.IntegerField()
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.title

class Classroom(models.Model):
    building = models.CharField(max_length=255)
    room_number = models.CharField(max_length=10)
    capacity = models.IntegerField()

    def __str__(self):
        return f"{self.building} {self.room_number}"

class Module(models.Model):
    title = models.CharField(max_length=255)
    credits = models.IntegerField()
    MODE_OF_DELIVERY_CHOICES = [
        ('online', 'Online'),
        ('physical', 'Physical')
    ]
    mode_of_delivery = models.CharField(max_length=10, choices=MODE_OF_DELIVERY_CHOICES)

    def __str__(self):
        return self.title

class Lecture(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lectures')
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='lectures', blank=True, null=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lectures')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    day_of_week = models.CharField(max_length=9)

    def __str__(self):
        return f"{self.course.title} - {self.module.title}"

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return self.title

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.event.title}"