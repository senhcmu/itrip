from django.test import TestCase
from rest_framework.test import (APIRequestFactory,
                                 force_authenticate,
                                 APIClient)          
from rest_framework.authtoken.models import Token


foctory = APIRequestFactory(enforce_csrf_checks=True)
user = User.objects.get(username='manager')
view = AccountDetail.as_view()

# Make an authenticated request to the view...
request = factory.get('/accounts/django-superstars/')
force_authenticate(request, user=user)
response = view(request)

# Using the standard RequestFactory API to create a form POST request
factory = APIRequestFactory(enforce_csrf_checks=True)
request = factory.post('/register/', 
                        json.dumps({
                                    "username": "testuser",
                                    "password":  "123",
                                    "password2": "123",
                                    "nickname": "testuser"
                                    }), 
                        content_type='application/json')

user = User.objects.get(username = 'manager')
request = factory.post('/login/')
force_authenticate(request, user=user, token=user.auth_token)


# Include an appropriate `Authorization:` header on all requests.
token = Token.objects.get(user__username='lauren')
client = APIClient()
client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

# Stop including any credentials
client.credentials()

# This can be a useful shortcut if you're testing the API but don't want to have to construct valid authentication credentials in order to make test requests.
user = User.objects.get(username='lauren')
client = APIClient()
client.force_authenticate(user=user)

# Unit Tests


# Integration Tests

# For all tests the expectation is that the result is either expected, unexpected, or an error.
# An expected result would be a 200 response on the homepage, but we can–and should–also test that the homepage does not return something unexpected, like a 404 response. 
# Anything else would be an error requiring further debugging.