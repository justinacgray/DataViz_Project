from django.urls import path
from .views import data_cleanse, data_stats
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns 


urlpatterns = [
    path("get_csrf/", data_stats.DataInsights.as_view()),
    path("upload_csv/", data_stats.DataInsights.as_view()),
    path("home/",data_stats.home, name="home"),
    path("get_all_csvs/", data_stats.get_all_csvs, name = "get_all_csvs"),
    path("create_function_name/", data_cleanse.create_function_name, name ="create_function_name"),
    path("get_all_function_names/", data_cleanse.get_all_function_names, name = "get_all_function_names")
]


urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)