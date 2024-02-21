from djongo import models

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
        return f''' ^^^^^^^^^ File ID - {self._id}, File_Name - {self.file_name}, CSV File PATH - {self.csv_file} ^^^^^^^^^'''