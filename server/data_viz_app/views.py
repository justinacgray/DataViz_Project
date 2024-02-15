from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.decorators import permission_classes
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import numpy as np
from .models import *
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class DataInsights(APIView):
    parser_classes = (MultiPartParser, FormParser, FileUploadParser, JSONParser)
    
    def home(self, request):
        # print("request---->", request)
        # print(type(request))
        return JsonResponse({'message': 'Shalom Todos!'})


    def get_csrf(self, request):
        token = get_token(request)
        return JsonResponse({'csrfToken': token})


    @csrf_exempt
    def dash(self, request, *args, **kwargs):
        csrf_token = request.headers.get('X-CSRFToken')
        # save csv file to path /dataset/

        if csrf_token:
            if request.method == 'POST':
                # file = FileUpload(csv_file=request.FILES["csv_file"])
                # file.save()
                file_obj = request.FILES.get('csv_file')
                print('File Name:', file_obj.name)
                print('File Size:', file_obj.size)
                
            else:
                return JsonResponse({'error': 'No file provided in the request.'}, status=400)                
            # filename = 'path/to/csv'
            # df = pd.read_csv(filename)
            # print(f"df rows ===> {df.shape[0]} df columns ===> {df.shape[1]}")
            
        else:
            return JsonResponse({'error': 'CSRF token not found in headers'})