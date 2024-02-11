from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


def home(request):
    return JsonResponse({'message': 'Shalom Todos!'})


@ensure_csrf_cookie
def dash(request):
    print("Request---------->", request)
    # return JsonResponse({})