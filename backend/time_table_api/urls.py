from django.urls import path
from .views import (
    CustomUserListCreateView, CustomUserDetailView,
    ClassroomListCreateView, ClassroomDetailView,
    ModuleListCreateView, ModuleDetailView,
    LectureListCreateView, LectureDetailView,
    EventListCreateView, EventDetailView,
    NotificationListCreateView, NotificationDetailView,
    ConflictListCreateView, ConflictDetailView
)

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
]