from rest_framework import serializers
from .models import User, Role, Company, Note, ContactPerson, Brand, LoginToken
from datetime import timedelta
from django.utils import timezone
import hashlib
import random
import string

#Authentication Serializers
class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=100, write_only=True)
    password = serializers.CharField(max_length=100, write_only=True)
    id = serializers.IntegerField(read_only=True)
    userId = serializers.PrimaryKeyRelatedField(read_only=True)
    roleId = serializers.PrimaryKeyRelatedField(read_only=True)
    expires = serializers.DateTimeField(read_only=True)
    token = serializers.CharField(max_length=100, read_only=True)
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.all().get(login__iexact=validated_data["login"])
        return LoginToken.objects.create(
            userId = User.objects.get(pk=user.id),
            roleId = user.roleId,
            expires = timezone.now() + timedelta(minutes=2),
            token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        )
        
    
    

#User-related Serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'surname', 'dateOfBirth', 'login', 'password', 'roleId', 'isDeleted']
        read_only_fields = ['id', 'roleId']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        data = validated_data
        data['password'] = hashlib.sha256(validated_data.get('password').encode("UTF-8")).hexdigest()
        data['isDeleted'] = False
        return User.objects.create(**data)
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.login = validated_data.get('login', instance.login)
        instance.save()
        return instance

class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'surname', 'dateOfBirth', 'roleId', 'isDeleted']
        read_only_fields = ['id','name', 'surname', 'dateOfBirth', 'roleId', 'isDeleted']

class ModUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'surname', 'dateOfBirth']
        read_only_fields = ['id']
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.save()
        return instance

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name', 'surname', 'dateOfBirth', 'login', 'roleId', 'isDeleted']
        read_only_fields = ['id']
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.dateOfBirth = validated_data.get('dateOfBirth', instance.dateOfBirth)
        instance.login = validated_data.get('login', instance.login)
        instance.roleId = validated_data.get('roleId', instance.roleId)
        instance.save()
        return instance


#Comapany-related serializers
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','name', 'nip', 'brandId', 'address', 'city', 'adminId', 'isDeleted']
        read_only_fields = ['id', 'adminId', 'isDeleted']
class ModCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id','name', 'nip', 'brandId', 'address', 'city', 'adminId', 'isDeleted']
        read_only_fields = ['id']

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'companyId', 'adminId', 'isDeleted']
        read_only_fields = ['id', 'adminId', 'isDeleted']
class ModNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'companyId', 'adminId', 'isDeleted']
        read_only_fields = ['id']

class ContactPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPerson
        fields = ['id', 'name', 'surname', 'phone', 'email', 'position', 'companyId', 'adminId', 'isDeleted']
        read_only_fields = ['id', 'adminId', 'isDeleted']
class ModContactPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPerson
        fields = ['id', 'name', 'surname', 'phone', 'email', 'position', 'companyId', 'adminId', 'isDeleted']
        read_only_fields = ['id']


#Other serializers
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id','name']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id','name']