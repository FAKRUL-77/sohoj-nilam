from django.urls import path

from user import views

urlpatterns = [
    path('login', views.loginORRegister, name='login'),
    path('logout', views.Logout, name='logout'),
]