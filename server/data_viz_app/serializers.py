from rest_framework import serializers
from .models import CSVUpload, FunctionName

class CSVUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVUpload
        fields = '__all__'


class FunctionNameSerializer():
    class Meta:
        model = FunctionName
        fields = '__all__'
    