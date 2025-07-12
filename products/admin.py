from django.contrib import admin

# products/admin.py
from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_by', 'created_at', 'updated_at')
    list_filter = ('created_by', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('name',)
