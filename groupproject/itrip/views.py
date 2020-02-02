from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import login as django_login, logout as django_logout
from itrip.serializers import RegistrationSerializer, LoginSerializer
from .models import Customer, Manager
import secrets, string

@api_view(['POST', ])
def auto_registration_view(request):
    if request.method == 'POST':
        token = request.data.get('token')
        user_original = Token.objects.get(key=token).user
        if user_original.is_manager == True:
            num_manager = str(Manager.objects.count())
            data = {}
            data['username'] = "manager" + num_manager
            data['nickname'] = "manager" + num_manager
            alphabet = string.ascii_letters + string.digits
            password = ''.join(secrets.choice(alphabet) for i in range(10))
            data['password'] = password
            data['password2'] = password
            serializer = RegistrationSerializer(data=data)
            data_new = {}
            if serializer.is_valid():
                user = serializer.save()
                user.is_customer = False
                user.is_manager = True
                user.save()
                manager = Manager(user=user)
                manager.save()
                data_new['is_success'] = True
                data_new['username'] = user.username
                data_new['password'] = data['password']
                token = Token.objects.get(user=user).key
                data_new['token'] = str(token)
            else:
                data_new = serializer.errors
            return Response(data_new)
        else:
            result = {
                "is_success": False
            }
            return Response(result)
    else:
        result = {
            "is_success": False
        }
        return Response(result)


@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        print("here")
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            customer = Customer(user=user)
            customer.save()
            data['is_success'] = True
            data['username'] = user.username
            data['nickname'] = user.nickname
            token = Token.objects.get(user=user).key
            data['token'] = str(token)
            django_login(request, user)
            # check user is successfully logged in
            print("here1")

            if request.user.is_authenticated:
                
                print(">>>>>>>>>>>>>>for test")
        else:
            print("here3")

            data = serializer.errors
        return Response(data)

@api_view(['POST', ])
def auto_registration_view(request):
    if request.method == 'POST':
        token = request.data.get('token')
        user_original = Token.objects.get(key=token).user
        if user_original.is_manager == True:
            num_manager = str(Manager.objects.count())
            data = {}
            data['username'] = "manager" + num_manager
            data['nickname'] = "manager" + num_manager
            alphabet = string.ascii_letters + string.digits
            password = ''.join(secrets.choice(alphabet) for i in range(10))
            data['password'] = password
            data['password2'] = password
            serializer = RegistrationSerializer(data=data)
            data_new = {}
            if serializer.is_valid():
                user = serializer.save()
                user.is_customer = False
                user.is_manager = True
                user.save()
                manager = Manager(user=user)
                manager.save()
                data_new['is_success'] = True
                data_new['username'] = user.username
                data_new['password'] = data['password']
                token = Token.objects.get(user=user).key
                data_new['token'] = str(token)
            else:
                data_new = serializer.errors
            return Response(data_new)
        else:
            result = {
                "is_success": False
            }
            return Response(result)
    else:
        result = {
            "is_success": False
        }
        return Response(result)

@api_view(['POST', ])
def login_view(request):
    if request.method == 'POST':
        
        serializer = LoginSerializer(data=request.data)
        data = {}
        data['is_success'] = False
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            django_login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            data['is_success'] = True
            data['token'] = str(token)
            data['user_id'] = user.pk
            data['username'] = user.username
            data['nickname'] = user.nickname

            # print(user)
            
        else:
            data = serializer.errors
        return Response(data)

class LogoutView(APIView):
    authentication_classes = (TokenAuthentication, )

    def post(self, request):
        data = {}
        data['is_success'] = False
        django_logout(request)
        result = {
        "is_success": True
        }
        return Response(result)
