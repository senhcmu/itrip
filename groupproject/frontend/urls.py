from django.urls import path, re_path
from . import views
from django.conf.urls import url

urlpatterns = [
	# re_path(r'.*', views.index)
	path('posts/', views.index),
	path('destinations/', views.index),
	path('community/', views.index),
	url(r'post/', views.index),
	path('signin/', views.index),
	path('signup/', views.index),
	path('drag/', views.index),
	path('schedule/', views.index),
	path('autoplanner/', views.index),
	url(r'profile/', views.index),
	path('manager/', views.index),
	path('hothotels/', views.index),
	path('hotrestaurants/', views.index),
	path('hotattractions/', views.index),
	path('autoplanner/detail', views.index),
	path('', views.index),
]
