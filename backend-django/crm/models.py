from posixpath import supports_unicode_filenames
from django.db import models
from datetime import datetime, timedelta
from django.utils.timezone import now

class LoginToken(models.Model):
    userId = models.ForeignKey( "User", on_delete=models.CASCADE)
    expires = models.DateTimeField()
    token = models.CharField(max_length=16)
    roleId = models.ForeignKey( "Role", on_delete=models.CASCADE)


class User(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100, blank=True, default='')
    dateOfBirth = models.DateField()
    login = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    roleId = models.ForeignKey( "Role", on_delete=models.CASCADE, default=3)
    isDeleted = models.BooleanField(default=False)

class Company(models.Model):
    name = models.CharField(max_length=100)
    nip = models.CharField(max_length=10)
    brandId = models.ForeignKey( "Brand", on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    adminId = models.ForeignKey( "User", on_delete=models.CASCADE)
    isDeleted = models.BooleanField(default=False)

class Note(models.Model):
    content = models.TextField()
    companyId = models.ForeignKey( "Company", on_delete=models.CASCADE)
    adminId = models.ForeignKey( "User", on_delete=models.CASCADE)
    isDeleted = models.BooleanField(default=False)

class ContactPerson(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100, blank=True, default='')
    phone = models.CharField(max_length=12)
    email = models.EmailField(max_length=150, blank=True, default='')
    position = models.CharField(max_length=50)
    companyId = models.ForeignKey( "Company", on_delete=models.CASCADE)
    adminId  = models.ForeignKey( "User", on_delete=models.CASCADE)
    isDeleted = models.BooleanField(default=False)

class Role(models.Model):
    name = models.CharField(max_length=50)

class Brand(models.Model):
    name = models.CharField(max_length=50)
    
    
    