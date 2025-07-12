# products/permissions.py
from rest_framework import permissions
from users.models import UserProfile


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        try:
            return UserProfile.objects.get(user=request.user).role == 'admin'
        except UserProfile.DoesNotExist:
            return False


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_authenticated:
            return False
        try:
            return UserProfile.objects.get(user=request.user).role == 'admin'
        except UserProfile.DoesNotExist:
            return False
