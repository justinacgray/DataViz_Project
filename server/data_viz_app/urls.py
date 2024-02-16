from django.urls import path
from .views import DataInsights
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns 

from . import views

urlpatterns = [
    # path("home/", DataInsights.as_view(), name="home"),
    path("get_csrf/", DataInsights.as_view()),
    path("upload_csv/", DataInsights.as_view()),
]


urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)