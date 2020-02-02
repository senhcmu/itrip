from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import authenticate
from itrip.models import Destinations, Hotels, Attractions, Resteraunts, Posts, User
from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password

# from account.models import Account
class RegistrationSerializer(serializers.ModelSerializer):
	password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
	class Meta:
		model = User
		fields = ['username','password','password2','nickname']
		extra_kwargs = {
			'password':{'write_only':True}
		}

	def save(self):
		account = User(
			# email=self.validated_data['email'],
			username=self.validated_data['username'],
			nickname=self.validated_data['nickname'],
		)
		password = self.validated_data['password']
		password2 = self.validated_data['password2']

		if password != password2:
			raise serializers.ValidationError({'password':'Passwords must match'})
		account.set_password(password)
		account.save()
		return account

class LoginSerializer(serializers.ModelSerializer):
	username = serializers.CharField()
	password = serializers.CharField()
	class Meta:
		model = User
		fields = [
			'username',
			'password',
		]
		extra_kwargs = {
			"password":{"write_only":True}
		}
	def validate(self,data):
		username = data.get("username", "")
		password = data.get("password", "")

		if username and password:
			user = authenticate(username=username, password=password)
			print(1)
			if user:
				data["user"] = user
			else:
				msg = "Unable to login with given credentials."
				raise exceptions.ValidationError(msg)
		else:
			msg = "Must provide username and password."
			raise exceptions.ValidationError(msg)
		return data

class HotelsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Hotels
		fields = "__all__"


class AttractionsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Attractions
		fields = "__all__"


class ResterauntsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Resteraunts
		fields = "__all__"




# Serialize Does two things: 1. converts to JSON, 2. validations for data passed
class PostsSerializer(serializers.ModelSerializer): # forms.ModelForm
	# destinations = serializers.PrimaryKeyRelatedField(queryset=Destinations.objects.all(), many=True)
	destinations = serializers.SerializerMethodField()
	def get_destinations(self, instance):
		# print('inside destinations')
		destinations = []
		a = instance.destinations.get_queryset()
		for i in a:
			destinations.append(i.name)
		return destinations
	# destinations = DestinationsSerializer(read_only=True, many=True)
	# author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
	def validate_name(self, value):
		qs = Posts.objects.filter(name__iexact=value) # including the current instance
		if self.instance:
			qs = qs.exclude(pk=self.instance.pk)
		if qs.exists():
			raise serializers.ValidationError("This title has already been used")
		return value
			
	class Meta:
		model = Posts
		fields = "__all__"

class DestinationsSerializer(serializers.ModelSerializer):
	# postsOnDestinations = PostsSerializer(many=True)
	class Meta:
		model = Destinations
		fields = ("name", "country", "postsOnDestinations")

