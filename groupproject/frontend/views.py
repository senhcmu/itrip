from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, 'frontend/index.html')


# def postList(request):
# 	return render(request, 'frontend/index.html')


# def post(request):
# 	return render(request, 'frontend/index.html')