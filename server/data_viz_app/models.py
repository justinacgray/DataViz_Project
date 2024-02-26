from djongo import models
from rest_pandas import PandasView, PandasUnstackedSerializer


# Create your models here.
class CSVUpload(models.Model):
    _id = models.ObjectIdField()
    file_name = models.CharField(max_length=144)
    csv_file = models.FileField(upload_to='datasets/', blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.file_name
    
    def __repr__(self) -> str:
        return f''' ^^^ File ID - {self._id}, \n
                        File_Name - {self.file_name}, \n
                        CSV File PATH - {self.csv_file} ^^^^'''
    

class DataFrame(models.Model):
    _id = models.ObjectIdField()
    # object = 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    



