from rest_framework import serializers
from .models import CSVUpload

class CSVUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVUpload
        fields = '__all__'
        