from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token


def home(request):
    # print("request---->", request)
    # print(type(request))
    return JsonResponse({'message': 'Shalom Todos!'})


def get_csrf(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})


@csrf_exempt
def dash(request):
    csrf_token = request.headers.get('X-CSRFToken')

    if csrf_token:
        # Proceed with file upload and processing
        
        return JsonResponse({'message': 'File uploaded successfully!'})
    else:
        return JsonResponse({'error': 'CSRF token not found in headers'})