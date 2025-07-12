# products/serializers.py
from rest_framework import serializers
from .models import Product
from reviews.models import Review

class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)  # Make read-only

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'created_by', 'created_at', 'updated_at', 'average_rating', 'review_count']

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return round(sum(review.rating for review in reviews) / len(reviews), 2)
        return 0

    def get_review_count(self, obj):
        return obj.reviews.count()