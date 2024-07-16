from django.contrib import admin
from .models import Instructor, Course, Classroom, Module, Lecture, Event, Notification

admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(Classroom)
admin.site.register(Module)
admin.site.register(Lecture)
admin.site.register(Event)
admin.site.register(Notification)