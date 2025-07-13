"""
URL configuration for product_review project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# product_review/urls.py
# product_review/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from products.views import ProductViewSet
from reviews.views import ReviewViewSet
from users.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'products/(?P<product_id>\d+)/reviews', ReviewViewSet, basename='product-reviews')
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', obtain_auth_token, name='api_token'),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('product/', TemplateView.as_view(template_name='product.html'), name='product'),
]