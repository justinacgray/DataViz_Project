from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home, name="home"),
    path("dash/", views.dash, name="dash"),
    path("get_csrf/", views.get_csrf, name="get_csrf")
]