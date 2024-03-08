import pandas as pd
import numpy as np
from ..models import FunctionNames


def create_function_name(self):
    pass

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