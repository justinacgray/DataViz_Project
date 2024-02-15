from django.urls import path
from .views import DataInsights
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    # path("home/", DataInsights.as_view(), name="home"),
    path("get_csrf/", DataInsights.as_view({'get': 'get_csrf'}), name="get_csrf"),
    path("dash/", DataInsights.as_view({'post': 'post_method'}), name="dash"),

]




if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)