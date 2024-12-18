from django.urls import path
from .views import (
    CustomUserListCreateView, CustomUserDetailView,
    ClassroomListCreateView, ClassroomDetailView,
    ModuleListCreateView, ModuleDetailView,
    LectureListCreateView, LectureDetailView,
    EventListCreateView, EventDetailView,
    NotificationListCreateView, NotificationDetailView,
    ConflictListCreateView, ConflictDetailView, LoginView,
    BatchListCreateView, BatchDetailView, FacultyListCreateView, FacultyDetailView
)
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # CustomUser URLs
    path('users/', CustomUserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', CustomUserDetailView.as_view(), name='user-detail'),

    # Classroom URLs
    path('classrooms/', ClassroomListCreateView.as_view(), name='classroom-list-create'),
    path('classrooms/<int:pk>/', ClassroomDetailView.as_view(), name='classroom-detail'),

    # Module URLs
    path('modules/', ModuleListCreateView.as_view(), name='module-list-create'),
    path('modules/<int:pk>/', ModuleDetailView.as_view(), name='module-detail'),

    # Lecture URLs
    path('lectures/', LectureListCreateView.as_view(), name='lecture-list-create'),
    path('lectures/<int:pk>/', LectureDetailView.as_view(), name='lecture-detail'),

    # Event URLs
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),

    # Notification URLs
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),
    path('notifications/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),

    # Conflict URLs
    path('conflicts/', ConflictListCreateView.as_view(), name='conflict-list-create'),
    path('conflicts/<int:pk>/', ConflictDetailView.as_view(), name='conflict-detail'),

    # Login URL
    path('login/', LoginView.as_view(), name='login'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('batches/', BatchListCreateView.as_view(), name='batch-list-create'),
    path('batches/<int:pk>/', BatchDetailView.as_view(), name='batch-detail'),
    
    path('faculties/', FacultyListCreateView.as_view(), name='faculty-list-create'),
    path('faculties/<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),
]