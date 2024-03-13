import pandas as pd
import numpy as np
from ..models import FunctionName
from ..serializers import FunctionNameSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect, csrf_exempt


@api_view(['POST'])
def create_function_name(request):
    print("### REQUEST ### ", request)
    print("### REQUEST DATA ### ", request.data)

    serializer = FunctionNameSerializer(data=request.data)
    #todo validate data
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_all_function_names():
    pass



def cleanDataframe():
    # conditionals
    #! if function name is called match to function in file
    
    pass


    

# removes extra spaces, tabs, new lines, returns
def cleanStringData(self, df): #change?
    df = df.replace(r'\r+|\n+|\t+|\(+|\)+|','', regex=True)
    new_df = pd.DataFrame()
    for col in df:
        series = df[col]
        # check column data type
        if series.dtype == 'object':
            series = series.str.strip() #removes leading and trailing spaces
            # series = series.str.replace(" ", "") #this removes all spaces 
            new_df[col] = series
        else:
            new_df[col] = series
    return new_df


def is_valid():
    pass