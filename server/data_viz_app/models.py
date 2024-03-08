from djongo import models
from rest_pandas import PandasView, PandasUnstackedSerializer
from django.core.validators import MinLengthValidator

# Create your models here.
class CSVUpload(models.Model):
    _id = models.ObjectIdField()
    file_name = models.CharField(max_length=144, validators=[MinLengthValidator(4)], blank=False, help_text='Length has to between 4 - 144 characters')
    csv_file = models.FileField(upload_to='datasets/', blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.file_name
    
    def __repr__(self) -> str:
        return f''' ^^^ File ID - {self._id}, \n
                        File_Name - {self.file_name}, \n
                        CSV File PATH - {self.csv_file} ^^^^'''
    

class FunctionName(models.Model):
    _id = models.ObjectIdField()
    function_name = models.CharField(max_length=144, validators=[MinLengthValidator(4)], blank=False, help_text='Length has to between 4 - 144 characters' )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self) -> str:
        return f'''FunctionName ID {self._id}  and name {self.function_name}'''