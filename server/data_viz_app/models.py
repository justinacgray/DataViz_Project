from django.db import models

# Create your models here.
class FileUpload(models.Model):
    file_name = models.CharField(max_length=144)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)