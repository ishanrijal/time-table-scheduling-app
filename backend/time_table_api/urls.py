# time_table_api/urls.py

from django.urls import path
from .views import (
    InstructorListCreateView,
    InstructorRetrieveUpdateDestroyView,
    CourseListCreateView,
    CourseRetrieveUpdateDestroyView,
    ClassroomListCreateView,
    ClassroomRetrieveUpdateDestroyView,
    ModuleListCreateView,
    ModuleRetrieveUpdateDestroyView,
    LectureListCreateView,
    LectureRetrieveUpdateDestroyView,
    EventListCreateView,
    EventRetrieveUpdateDestroyView,
    NotificationListCreateView,
    NotificationRetrieveUpdateDestroyView,
    RegisterView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('instructors/', InstructorListCreateView.as_view(), name='instructor-list-create'),
    path('instructors/<int:pk>/', InstructorRetrieveUpdateDestroyView.as_view(), name='instructor-detail'),
    path('courses/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyView.as_view(), name='course-detail'),
    path('classrooms/', ClassroomListCreateView.as_view(), name='classroom-list-create'),
    path('classrooms/<int:pk>/', ClassroomRetrieveUpdateDestroyView.as_view(), name='classroom-detail'),
    path('modules/', ModuleListCreateView.as_view(), name='module-list-create'),
    path('modules/<int:pk>/', ModuleRetrieveUpdateDestroyView.as_view(), name='module-detail'),
    path('lectures/', LectureListCreateView.as_view(), name='lecture-list-create'),
    path('lectures/<int:pk>/', LectureRetrieveUpdateDestroyView.as_view(), name='lecture-detail'),
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='event-detail'),
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationRetrieveUpdateDestroyView.as_view(), name='notification-detail'),
]