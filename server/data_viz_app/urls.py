from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("home/", views.DataInsights.home, name="home"),
    path("dash/", views.DataInsights.dash, name="dash"),
    path("get_csrf/", views.DataInsights.get_csrf, name="get_csrf")
]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)