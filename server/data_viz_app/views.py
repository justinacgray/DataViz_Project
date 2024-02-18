from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import CSVUpload
from .serializers import CSVUploadSerializer
from django.conf import settings
import pandas as pd
import numpy as np



class DataInsights(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        token = get_token(request)
        print("##### token from server ######", token)
        return JsonResponse({'csrfToken -->': token})

    def post(self, request, *args, **kwargs):
        print("******* REQuest.data *******", request.data)        
            
        csrf_token = request.headers.get('X-CSRFToken')
        # save csv file to path /dataset/
        if csrf_token:
            file_obj = self.request.FILES['file']
            print('File Name:', file_obj.name)
            print('File Size:', file_obj.size)
            
            # Assuming CSVUpload model has 'file_name' and 'csv_file' fields
            csv_upload = CSVUpload(file_name=file_obj.name, csv_file=file_obj)
            csv_upload.save()
            serializer = CSVUploadSerializer(csv_upload)
            print("###### viewsssss path", (f"{settings.MEDIA_URL}datasets/{file_obj.name}"))
            df = pd.read_csv(f"{settings.MEDIA_ROOT}datasets/{file_obj.name}")
            output = {
                'serializer': serializer.data,
                'df_info' : df.info()
            }
            print("SERIALIZER--->", serializer)
            
            return Response(output, status=status.HTTP_201_CREATED)
        elif not csrf_token:
            return JsonResponse({'error': 'CSRF token not found in headers'}, status=405)
        else: 
            return JsonResponse({'error': 'No file provided in the request.'}, status=400)
        



def home(self, request):
    # print("request---->", request)
    # print(type(request))
    return JsonResponse({'message': 'Shalom Todos!'})