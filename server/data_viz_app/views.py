from django.http import JsonResponse


def home(request):
    return JsonResponse({'message': 'Shalom Todos!'})

def dash(request):
    print("Request---------->", request)
    # return JsonResponse({})