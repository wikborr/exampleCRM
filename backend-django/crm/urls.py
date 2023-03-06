from django.urls import path
from . import views
from rest_framework import routers
from .views import UserViewSet, RegisterViewSet, OwnUserView, ModUserViewSet, AdminUserViewSet
from .views import CompanyViewSet, ModCompanyViewSet, NoteViewSet, ModNoteViewSet, ContactPersonViewSet, ModContactPersonViewSet
from .views import RoleViewSet, BrandViewSet, ModBrandViewSet
from .views import LoginViewSet

router = routers.DefaultRouter()

router.register("register", RegisterViewSet, "register")
router.register("login", LoginViewSet, "login")

router.register("users", UserViewSet, "users")
router.register("mod/users", ModUserViewSet, "mod/users")
router.register("admin/users", AdminUserViewSet, "admin/users")

router.register("companies", CompanyViewSet, "companies")
router.register("mod/companies", ModCompanyViewSet, "mod/companies")
router.register("admin/companies", ModCompanyViewSet, "admin/companies")
router.register("notes", NoteViewSet, "notes")
router.register("mod/notes", ModNoteViewSet, "mod/notes")
router.register("admin/notes", ModNoteViewSet, "admin/notes")
router.register("contact-people", ContactPersonViewSet, "contact-people")
router.register("mod/contact-people", ModContactPersonViewSet, "mod/contact-people")
router.register("admin/contact-people", ModContactPersonViewSet, "admin/contact-people")

router.register("roles", RoleViewSet, "roles")
router.register("brands", BrandViewSet, "brands")
router.register("mod/brands", ModBrandViewSet, "mod/brands")
router.register("admin/brands", ModBrandViewSet, "mod/admin")

urlpatterns = [
    path('<int:pk>/', OwnUserView.as_view()),
]

urlpatterns+= router.urls