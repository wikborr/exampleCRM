from django.contrib import admin
from .models import User, Company, Note, ContactPerson, Role, Brand

admin.site.register(User)
admin.site.register(Company)
admin.site.register(Note)
admin.site.register(ContactPerson)
admin.site.register(Role)
admin.site.register(Brand)