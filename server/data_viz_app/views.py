from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import CSVUpload
from .serializers import CSVUploadSerializer
import pandas as pd
import numpy as np


class DataInsights(APIView):
    parser_classes = (FileUploadParser,)
    
    # def home(self, request):
    #     # print("request---->", request)
    #     # print(type(request))
    #     return JsonResponse({'message': 'Shalom Todos!'})


    def get(self, request, *args, **kwargs):
        token = get_token(request)
        print("token from server", token)
        return JsonResponse({'csrfToken -->': token})

    def dash(self, request, *args, **kwargs):
        csrf_token = request.headers.get('X-CSRFToken')
        # save csv file to path /dataset/
        if csrf_token:
            if request.method == 'POST':
                file_obj = request.data['file']
                print('File Name:', file_obj.name)
                print('File Size:', file_obj.size)
                
                # Assuming CSVUpload model has 'file_name' and 'csv_file' fields
                csv_upload = CSVUpload(file_name=file_obj.name, csv_file=file_obj)
                csv_upload.save()

                serializer = CSVUploadSerializer(csv_upload)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'error': 'No file provided in the request.'}, status=400)
        else:
            return JsonResponse({'error': 'CSRF token not found in headers'})