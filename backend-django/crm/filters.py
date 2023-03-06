from rest_framework import filters
from .models import ContactPerson, Company
from django.db.models import CharField, Value
from django.db.models.functions import Concat

class ContactNameSearch(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('q'):
            queryset = ContactPerson.objects.annotate(search_name=Concat('name', Value(' '), 'surname'))
            return queryset.filter(search_name__icontains=request.query_params.get('q'))
        return queryset

class CompanyFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        q = queryset
        if request.query_params.get('brand'):
            q = q.filter(brandId__name__icontains=request.query_params.get('brand'))
        if request.query_params.get('city'):
            q = q.filter(city__icontains=request.query_params.get('city'))
        return q