# reviews/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        if not product_id:
            raise ValidationError("Product ID is required")
        if Review.objects.filter(user=self.request.user, product_id=product_id).exists():
            raise ValidationError("You have already reviewed this product")
        serializer.save(user=self.request.user, product_id=product_id)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_reviews(self, request):
        reviews = Review.objects.filter(user=request.user)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)

