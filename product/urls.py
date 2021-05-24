from django.urls import path, include
from product import views

urlpatterns = [
    path('', views.home, name='home'),
    path('<int:id>', views.product_detail, name='product_detail'),
    path('my_product/', views.myProduct, name='my_product'),
    path('add_product/', views.addProduct, name='add_product'),
    path('add/', views.addProduct, name='add'),
    path('admin-d/', views.adminDashboard, name='admin')
]