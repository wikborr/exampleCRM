from xmlrpc.client import ResponseError
from crm.models import User, Role, Company, Note, ContactPerson, Brand, LoginToken
from django.shortcuts import get_object_or_404
from django.http import Http404, HttpResponseBadRequest
from rest_framework import viewsets,permissions, mixins, generics
from .serializers import UserSerializer, ListUserSerializer, ModUserSerializer, AdminUserSerializer
from .serializers import CompanySerializer, ModCompanySerializer,ContactPersonSerializer, ModContactPersonSerializer , NoteSerializer, ModNoteSerializer
from .serializers import RoleSerializer, BrandSerializer
from .serializers import LoginSerializer
from .permissions import IsOwner, IsLogged, IsMod, IsAdmin
from .filters import ContactNameSearch, CompanyFilter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
import hashlib

# Authentication Viewsets
class LoginViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = LoginToken.objects.all()
    serializer_class = LoginSerializer
    
    def create(self, request):
        try:
            user = User.objects.all().get(login__iexact=request.data["login"])
        except:
            return Response({"login":"bad"}, status=status.HTTP_400_BAD_REQUEST)
        if user.password != hashlib.sha256(request.data.get('password').encode("UTF-8")).hexdigest():
            return Response({"password":"bad"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User-related Viewsets
class RegisterViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OwnUserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsOwner]
    serializer_class = UserSerializer
    
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
   
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.isDeleted = True
        user.name = "NULL"
        user.surname = "NULL"
        user.dateOfBirth = "0001-01-01"
        user.login = "NULL"
        user.password = "NULL"
        user.roleId = Role.objects.get(pk=3)
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all().filter(isDeleted=False).order_by('roleId')
    permission_classes = [IsLogged]
    serializer_class = ListUserSerializer

class ModUserViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin ,viewsets.GenericViewSet):
    queryset = User.objects.all().filter(isDeleted=False).order_by('roleId')
    permission_classes = [IsMod]
    serializer_class = UserSerializer
    def update(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        
        serializer = ModUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUserViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin ,viewsets.GenericViewSet):
    queryset = User.objects.all().filter(isDeleted=False).order_by('roleId')
    permission_classes = [IsAdmin]
    serializer_class = AdminUserSerializer
    def destroy(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        user.isDeleted = True
        user.name = "NULL"
        user.surname = "NULL"
        user.dateOfBirth = "0001-01-01"
        user.login = "NULL"
        user.password = "NULL"
        user.roleId = Role.objects.get(pk=3)
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)



# Company-related Viewsets
class CompanyViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Company.objects.all().filter(isDeleted=False).order_by('brandId')
    permission_classes = [IsLogged]
    serializer_class = CompanySerializer
    filter_backends = [CompanyFilter]
    
class ModCompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().filter(isDeleted=False).order_by('brandId')
    permission_classes = [IsMod]
    serializer_class = ModCompanySerializer
    filter_backends = [CompanyFilter]
    def destroy(self, request, pk=None):
        queryset = Company.objects.all()
        company = get_object_or_404(queryset, pk=pk)
        company.isDeleted = True
        company.name="NULL"
        company.nip="NULL"
        company.brandId = Brand.objects.get(pk=1)
        company.address="NULL"
        company.city="NULL"
        company.name="NULL"
        company.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NoteViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Note.objects.all().filter(isDeleted=False).order_by('companyId')
    pagination_class = None
    permission_classes = [IsLogged]
    serializer_class = NoteSerializer

class ModNoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().filter(isDeleted=False).order_by('companyId')
    pagination_class = None
    permission_classes = [IsMod]
    serializer_class = ModNoteSerializer
    def destroy(self, request, pk=None):
        queryset = Note.objects.all()
        note = get_object_or_404(queryset, pk=pk)
        note.isDeleted = True
        note.content="NULL"
        note.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ContactPersonViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ContactPerson.objects.all().filter(isDeleted=False).order_by('companyId')
    pagination_class = None
    permission_classes = [IsLogged]
    serializer_class = ContactPersonSerializer
    filter_backends = [ContactNameSearch]

class ModContactPersonViewSet(viewsets.ModelViewSet):
    queryset = ContactPerson.objects.all().filter(isDeleted=False).order_by('companyId')
    pagination_class = None
    permission_classes = [IsMod]
    serializer_class = ModContactPersonSerializer
    filter_backends = [ContactNameSearch]
    def destroy(self, request, pk=None):
        queryset = ContactPerson.objects.all()
        contact = get_object_or_404(queryset, pk=pk)
        contact.isDeleted = True
        contact.name="NULL"
        contact.surname="NULL"
        contact.phone="NULL"
        contact.email="NULL@NULL.COM"
        contact.position="NULL"
        contact.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Other Viewsets
class RoleViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Role.objects.all().order_by('id')
    pagination_class = None
    permission_classes = [permissions.AllowAny]
    serializer_class = RoleSerializer

class BrandViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Brand.objects.all().exclude(id=1).order_by('id')
    pagination_class = None
    permission_classes = [permissions.AllowAny]
    serializer_class = BrandSerializer

class ModBrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().exclude(id=1).order_by('id')
    pagination_class = None
    permission_classes = [IsMod]
    serializer_class = BrandSerializer