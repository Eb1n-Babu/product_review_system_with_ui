from django.contrib import admin

# reviews/admin.py
from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at')
    list_filter = ('product', 'user', 'rating')
    search_fields = ('product__name', 'user__username', 'feedback')
    ordering = ('-created_at',)