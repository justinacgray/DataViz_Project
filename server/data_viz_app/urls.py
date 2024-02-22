from django.urls import path
from .views import DataInsights
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns 

from . import views

urlpatterns = [
    path("get_csrf/", DataInsights.as_view()),
    path("upload_csv/", DataInsights.as_view()),
    path("home/",views.home, name="home"),
    path("get_all_csvs/", views.get_all_csvs, name = "get_all_csvs")
]


urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)