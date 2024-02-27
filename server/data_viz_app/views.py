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
import json



def home(self, request):
    # print("request---->", request)
    # print(type(request))
    return JsonResponse({'message': 'Shalom Todos!'})


class DataInsights(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        token = get_token(request)
        return JsonResponse({'csrfToken -->': token})

    def post(self, request, *args, **kwargs):
        print("******* REQuest.data *******", request.data)        
            
        csrf_token = request.headers.get('X-CSRFToken')
        # save csv file to path /dataset/
        if csrf_token:
            file_obj = self.request.FILES['file']
            print('File Name:', file_obj.name)
            print('File Size:', file_obj.size)
            
            csv_upload = self.save_csv(file_obj)
            serializer = CSVUploadSerializer(csv_upload)
            print("###### viewsssss path", (f"{settings.MEDIA_URL}datasets/{file_obj.name}"))
            # df_info_dict = {
            #     'columns': df.columns.tolist(),
            #     'data_types': {col: str(dtype) for col, dtype in df.dtypes.items()},
            #     'non_null_count': df.count().to_dict(),
            #     'info_head' : df.head(10),
            # }
            df_info_dict = self.data_stats(file_obj)
            output = {
                'serializer': serializer.data,
                'df_info' : df_info_dict
            }
            print("df info --->", df_info_dict)
            print("-----dot data", serializer.data)
            return Response(output, status=status.HTTP_201_CREATED)
        elif not csrf_token:
            return JsonResponse({'error': 'CSRF token not found in headers'}, status=405)
        else: 
            return JsonResponse({'error': 'No file provided in the request.'}, status=400)
        

    def save_csv(self, file_obj):
        csv_upload = CSVUpload(file_name=file_obj.name, csv_file=file_obj)
        csv_upload.save()
        return csv_upload
    
    def data_stats(self, file_obj):
        df = pd.read_csv(f"{settings.MEDIA_ROOT}datasets/{file_obj.name}")
        print('columns',  type(df.columns))
        print('data_types', type(df.dtypes))
        # print("df_info", df.info().to_list())
        # print("df_head", df.head().to_dict())
        
        df_info_dict = {
            'columns': df.columns, 
            "describe" : df.describe(),
        }
        return df_info_dict

        
    
    def is_csv_uploaded():
        pass

def get_all_csvs(self):
    all_db_csvs = CSVUpload.objects.all()
    serializer_csvs = CSVUploadSerializer(all_db_csvs, many=True)
    print("all DB CVS ---->", all_db_csvs)
    print("all DB CVS serializer---->", serializer_csvs)
    return JsonResponse({"csvs" : serializer_csvs.data})

