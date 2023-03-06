from time import time
from rest_framework import permissions
from .models import LoginToken
from django.utils import timezone

class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if "HTTP_AUTHORIZATION" in request.META:
            token = str(request.META["HTTP_AUTHORIZATION"]).replace("Bearer ","")
            auth_data = LoginToken.objects.all().filter(token__iexact=token).order_by('-expires').first()
            if not auth_data:
                return False
            if auth_data.expires < timezone.now():
                return False
            id = str(request.path).replace("/","").replace("api","")
            if int(auth_data.userId.id) == int(id):
                return True
        return False

class IsLogged(permissions.BasePermission):
    def has_permission(self, request, view):
        if "HTTP_AUTHORIZATION" in request.META:
            token = str(request.META["HTTP_AUTHORIZATION"]).replace("Bearer ","")
            auth_data = LoginToken.objects.all().filter(token__iexact=token).order_by('-expires').first()
            if not auth_data:
                return False
            if auth_data.expires < timezone.now():
                return False
            return True
        return False

class IsMod(permissions.BasePermission):
    def has_permission(self, request, view):
        if "HTTP_AUTHORIZATION" in request.META:
            token = str(request.META["HTTP_AUTHORIZATION"]).replace("Bearer ","")
            auth_data = LoginToken.objects.all().filter(token__iexact=token).order_by('-expires').first()
            if not auth_data:
                return False
            if auth_data.expires < timezone.now():
                return False
            if int(auth_data.roleId.id) < 3:
                return True
        return False

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if "HTTP_AUTHORIZATION" in request.META:
            token = str(request.META["HTTP_AUTHORIZATION"]).replace("Bearer ","")
            auth_data = LoginToken.objects.all().filter(token__iexact=token).order_by('-expires').first()
            if not auth_data:
                return False
            if auth_data.expires < timezone.now():
                return False
            if int(auth_data.roleId.id) < 2:
                return True
        return False