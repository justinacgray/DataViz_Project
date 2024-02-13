from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("home/", views.home, name="home"),
    path("dash/", views.dash, name="dash"),
    path("get_csrf/", views.get_csrf, name="get_csrf")
]




if settings.DEBUG:
    urlpatterns += static(settings.DATASET_URL, document_root=settings.DATASET_ROOT)