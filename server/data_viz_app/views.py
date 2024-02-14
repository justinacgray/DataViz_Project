from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token
from rest_framework.decorators import permission_classes
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import numpy as np


class DataInsights():
    def home(request):
        print("request---->", request)
        print(type(request))
        return JsonResponse({'message': 'Shalom Todos!'})


    def get_csrf(request):
        token = get_token(request)
        return JsonResponse({'csrfToken': token})


    @csrf_exempt
    def dash(request):
        if request.method == "POST":
            csrf_token = request.headers.get('X-CSRFToken')
            form = ModelFormWithFileField(request.POST, request.FILES)
            if form.is_valid():
                # file is saved
                form.save()
        print("request", request)
        # save csv file to path /dataset/

        if csrf_token:
            # filename = 'path/to/csv'
            # df = pd.read_csv(filename)
            # print(f"df rows ===> {df.shape[0]} df columns ===> {df.shape[1]}")
            
            return JsonResponse({'message': 'File uploaded successfully!'})
        else:
            return JsonResponse({'error': 'CSRF token not found in headers'})