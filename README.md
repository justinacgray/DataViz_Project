React/Django App with Mongo DB

Note: Use specific versions of Djongo/Mongo!
https://stackoverflow.com/questions/70185942/why-i-am-getting-not-implemented-error-database-objects-do-not-implement-truth
The problem is with the new version of pymongo (4.0 from 29.11.2021) which is not supported by Djongo 1.3.6. You need to install pymongo 3.12.1


Important Docs:
https://pypi.org/project/django-cors-headers/ 

Inside the SEttings.py (website)
CORS_ALLOW_HEADERS = (
    *default_headers,
    "Content-Disposition",
)

https://www.geeksforgeeks.org/class-based-views-django-rest-framework/

Common Errors:
TypeError: int() argument must be a string, a bytes-like object or al number, not 'ObjectId' [ MUST be in the models =>_id = models.ObjectIdField() ] 

NotImplementedError: Database objects do not implement truth value testing or bool(). Please compare with None instead: database is not None [ Different Versions for Djongo/Mongo - MUST Djongo 1.3.6 and Pymongo 3.12.1] 

