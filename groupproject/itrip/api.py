# 1. This is an API Endpoints
#          - CRUD Retrive Update Delete
#          - Create & List & Search
# 2. HTTP methods
#          - GET POST PUT DELETE
# 3. Data Types & Validation
#          - JSON -> Serializer
#          - Validation -> Serializer

from itrip.models import User, Manager, Customer, Destinations, Hotels, Attractions, Resteraunts, Posts
from rest_framework import viewsets, permissions, generics
from .serializers import DestinationsSerializer, HotelsSerializer, AttractionsSerializer, ResterauntsSerializer, PostsSerializer
from rest_framework.response import Response
import requests, datetime, csv, json, random
from django.http import JsonResponse
from collections import defaultdict
from django.conf import settings
from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from django.core import serializers
from .models import Customer, Posts
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator
from .attractionTypeDict import attractionTypeDict
from django.views.decorators.csrf import csrf_exempt
from .autoplanner import autoPlanner

from django.db.models import Q
from rest_framework.decorators import api_view
class DestinationsViewsets(viewsets.ModelViewSet):
    queryset = Destinations.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = DestinationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']

# CheckManagerToken
class CheckManager(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if len(Token.objects.filter(key=token)) == 0:
            result = {
                    "is_manager" : False
                }
            return JsonResponse(result)


        user = Token.objects.get(key=token).user
        if user:
            if user.is_manager == True:
                result = {
                    "is_manager" : True
                }
            else:
                result = {
                    "is_manager" : False
                }
        return JsonResponse(result)


class DestinationsCountryViewsets(generics.ListAPIView):
    queryset = Destinations.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = DestinationsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['country']


# Add one people management Page

# class DestinationsDetailView(generics.RetrieveAPIView):
#     queryset = Destinations.objects.all()
#     permission_class = [
#         permissions.AllowAny
#     ]
#     serializer_class = DestinationsSerializer
#     filter_backends = [DjangoFilterBackend]
#     search_fields = ['country']

class HotelsViewsets(viewsets.ModelViewSet):
    queryset = Hotels.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = HotelsSerializer

class HotelsDetailView(generics.RetrieveAPIView):
    queryset = Hotels.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = HotelsSerializer



class AttractionsViewsets(viewsets.ModelViewSet):
    queryset = Attractions.objects.all()
    permission_class = [
        permissions.AllowAny
    ]

    serializer_class = AttractionsSerializer

class AttractionsDetailView(generics.RetrieveAPIView):
    queryset = Attractions.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = AttractionsSerializer


class ResterauntsViewsets(viewsets.ModelViewSet):
    queryset = Resteraunts.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = ResterauntsSerializer

class ResterauntsDetailView(generics.RetrieveAPIView):
    queryset = Resteraunts.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = ResterauntsSerializer


class PostsViewsets(viewsets.ModelViewSet):
    queryset = Posts.objects.all()

    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = PostsSerializer

# GetPostAPI
class GetPostAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        queryset = Posts.objects.all()
        result = {}
        result['results'] = []
    
        for post in queryset:
            temp = {}
            temp['id'] = post.id            
            temp['name'] = post.name
            temp['content'] = post.content
            temp['publishTime'] = post.publishTime
            temp['author'] = post.author.username
            temp['likes'] = post.likes.count()
            temp['dislikes'] = post.dislikes.count()
            temp['travelTime'] = post.travelTime
            temp['destinations'] = post.destinations.name
            temp['travelExpense'] = post.travelExpense  
            temp['photoURL'] = post.photoUrl     
            result['results'].append(temp)
        
        return JsonResponse(result)


class PostsDetailView(generics.RetrieveAPIView):
    queryset = Posts.objects.all()
    permission_class = [
        permissions.AllowAny
    ]
    serializer_class = PostsSerializer

def buildingNewDestination(city):
    resp = requests.post(url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s&language=en&language=en&key=AIzaSyB504OVqXKiEdW0xkoum0O886zyhEun8_Q" % (city))
    country = json.loads(resp.text)['results'][0]['formatted_address'].split(" ")[-1]

    destination = Destinations(name=city, country=country)
    destination.save()

    resp = requests.post(url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s+point+of+interest&language=en&language=en&key=AIzaSyB504OVqXKiEdW0xkoum0O886zyhEun8_Q" % (city))
    if resp.status_code == 200:
        for point in json.loads(resp.text)['results']:
            if len(Attractions.objects.filter(name__exact=point['name'], destination=destination)) == 0:
                name = point['name']
                address = point['formatted_address']
                # photo = point['photos'][0]["photo_reference"]
                googleRating = point['rating']
                destination = destination
                if "tourist_attraction" in point['types']:
                    point['types'].remove("tourist_attraction")
                if "point_of_interest" in point['types']:
                    point['types'].remove("point_of_interest")
                if len(point['types']) == 0:
                    point['types'] = ["tourist_attraction"]
                attractionType = point['types'][0]
                if attractionType not in attractionTypeDict:
                    time = 2
                else:
                    time = attractionTypeDict[attractionType] 
                attraction = Attractions(name=name, address=address, rating=googleRating, destination=destination, time=time, attractionType=attractionType)
                attraction.save()
                # print(1)

    resp = requests.post(url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s+resteraunt&language=en&language=en&key=AIzaSyB504OVqXKiEdW0xkoum0O886zyhEun8_Q" % (city))
    if resp.status_code == 200:
        for point in json.loads(resp.text)['results']:
            if len(Resteraunts.objects.filter(name__exact=point['name'], destination=destination)) == 0:
                name = point['name']
                address = point['formatted_address']
                googleRating = point['rating']
                # photo = point['photos'][0]["photo_reference"]
                destination = destination
                resteraunt = Resteraunts(name=name, address=address, rating=googleRating, destination=destination)
                resteraunt.save()

    resp = requests.post(url="https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s+hotels&language=en&language=en&key=AIzaSyB504OVqXKiEdW0xkoum0O886zyhEun8_Q" % (city))
    if resp.status_code == 200:
        for point in json.loads(resp.text)['results']:
            if len(Hotels.objects.filter(name__exact=point['name'], destination=destination)) == 0:
                name = point['name']
                address = point['formatted_address']
                googleRating = point['rating']
                # photo = point['photos'][0]["photo_reference"]
                destination = destination
                hotel = Hotels(name=name, address=address, rating=googleRating, destination=destination)
                hotel.save()

# GetAttractionsAPI
class GetAttractionsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get('city')
        print(city)
        print(type(city))
        result = {
            'city': city,
            'resultsOn': 'Attractions',
            'results':[],
            'is_success': 0,
        }

        if len(Destinations.objects.filter(name__exact=city)) == 0:
            buildingNewDestination(city)


        if len(Destinations.objects.filter(name__exact=city)) == 1:
            destination = Destinations.objects.get(name__exact=city)
            attractions = Attractions.objects.filter(destination=destination)
            for attraction in attractions:
                temp = {
                        'name': attraction.name,
                        'address': attraction.address,
                        'google_rating': attraction.rating,
                        # 'photo': attraction.photo,

                    }
                result['results'].append(temp)
            result['is_success'] = 1

        return JsonResponse(result)

# GetRestaurantsAPI
class GetRestaurantsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get('city')
        result = {
            'city': city,
            'resultsOn': 'Resteraunts',
            'results':[],
            'is_success': 0,
        }

        if len(Destinations.objects.filter(name__exact=city)) == 0:
            buildingNewDestination(city)

        if len(Destinations.objects.filter(name__exact=city)) == 1:
            destination = Destinations.objects.get(name__exact=city)
            resteraunts = Resteraunts.objects.filter(destination=destination)
            for resteraunt in resteraunts:
                temp = {
                        'name': resteraunt.name,
                        'address': resteraunt.address,
                        'google_rating': resteraunt.rating,
                        # 'photo': resteraunt.photo,
                    }
                result['results'].append(temp)
            result['is_success'] = 1

        return JsonResponse(result)

# GetRestaurantsAPI
class GetHotelsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get('city')        
        result = {
            'city': city,
            'resultsOn': 'Hotels',
            'results':[],
            'is_success': 0,
        }

        if len(Destinations.objects.filter(name__exact=city)) == 0:
            buildingNewDestination(city)

        if len(Destinations.objects.filter(name__exact=city)) == 1:
            destination = Destinations.objects.get(name__exact=city)
            hotels = Hotels.objects.filter(destination=destination)
            for hotel in hotels:
                    temp = {
                            'name': hotel.name,
                            'address': hotel.address,
                            'google_rating': hotel.rating,
                            # 'photo': hotel.photo,
                        }
                    result['results'].append(temp)
            result['is_success'] = 1

        return JsonResponse(result)

#FollowAPI
# @permission_classes((IsAuthenticated,))
class FollowAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        # set up return result
        print(request.data)
        result = {}
        result['is_success'] = False
        result['is_following'] = False
        # Get the token and username from frontend
        token = request.data.get('token')
        print('>>>>>>>>>>>>>>>>>>>>')
        print(token)
        user_original = Token.objects.get(key=token).user
        customer_original = Customer.objects.get(user=user_original)

        username = request.data.get('username')
        user_profile = User.objects.get(username=username)
        customer_profile = Customer.objects.get(user=user_profile)

        # check if it is following already
        for follower in customer_profile.follower.all():
            if follower.username == user_original.username:
                result['is_following'] = True
                return JsonResponse(result)

        customer_profile.follower.add(user_original)
        customer_original.following.add(user_profile)
        result['is_success'] = True
        result['is_following'] = True
        return JsonResponse(result)

#unFollowAPI
# @permission_classes((IsAuthenticated,))
class UnfollowAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        # set up return result
        result = {}
        result['is_success'] = False
        result['is_following'] = False
        # Get the token and username from frontend
        token = request.data.get('token')
        user_original = Token.objects.get(key=token).user
        customer_original = Customer.objects.get(user=user_original)

        username = request.data.get('username')
        user_profile = User.objects.get(username=username)
        customer_profile = Customer.objects.get(user=user_profile)

        # check if it is following already
        for follower in customer_profile.follower.all():
            if follower.username == user_original.username:
                customer_profile.follower.remove(user_original)
                customer_original.following.remove(user_profile)
                result['is_success'] = True
                result['is_following'] = False
                return JsonResponse(result)
        return JsonResponse(result)

# PublishPostAPI
class PublishPostAPI(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        # Check if it is the original Author
        # author = request.user
        # if post.author != author or post.author.is_manager == False:
        #     return Response({'response': "You don't have permission to edit that"})
        # post.delete()
        # result = {
        # "is_delete_success": 1,
        # }
        # return JsonResponse(result)
        result = {}
        result['is_success'] = False
        print(">>>>>>>>>>>>>>>>>>>Are we here Too?")
        destinations = request.data.get('destinations').split(",")
        name = request.data.get('name')
        content = request.data.get('content')
        travelExpense = request.data.get('travelExpense')
        travelTime = request.data.get('travelTime')
        author = request.user
        photoURL = request.data.get('photoURL')

        post = Posts(name=name, content=content, travelExpense=travelExpense, travelTime=travelTime, author=author, photoUrl=photoURL)
        post.save()
        for city in destinations:
            if len(Destinations.objects.filter(name__exact=city)) == 0:
                buildingNewDestination(city)
            if len(Destinations.objects.filter(name__exact=city)) == 1:
                post.destinations.add(Destinations.objects.get(name__exact=city))

        result = {
        "is_success": 1,
        "pk": post.id,
        "content":content,
        "author":author.username,
        "name":name,
        "photoURL":photoURL
        }

        return JsonResponse(result)

class LikeAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        print(request.data)
        result = {}
        result['is_success'] = False

        # find out post
        pk = request.data.get('pk')
        post = Posts.objects.get(pk=int(pk))

        # token
        token = request.data.get('user_token')
        user_original = Token.objects.get(key=token).user

        # check if it is already liked
        for user in post.likes.all():
            if user.username == user_original.username:
                return JsonResponse(result)

        post.likes.add(user_original)
        post.save()

        result['is_success'] = True
        result['likes_num'] = post.likes.count(),
        
        return JsonResponse(result)

class DislikeAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        result = {}
        result['is_success'] = False

        # find out post
        pk = request.data.get('pk')
        post = Posts.objects.get(pk=int(pk))

        # token
        token = request.data.get('user_token')
        user_original = Token.objects.get(key=token).user

        # check if it is already liked
        for user in post.dislikes.all():
            if user.username == user_original.username:
                return JsonResponse(result)

        post.dislikes.add(user_original)
        post.save()

        result['is_success'] = True
        result['dislikes_num'] = post.dislikes.count(),
        
        return JsonResponse(result)

# # UpdateLikeAPI
# @permission_classes((IsAuthenticated,))
class DeletePostAPI(generics.GenericAPIView):
    def delete(self, request, *args, **kwargs):
        pk = request.data.get('pk')
        post = Posts.objects.get(pk=int(pk))
        # Check if it is the original Author
        author = request.user
        if post.author != author or post.author.is_manager == False:
            return Response({'response': "You don't have permission to edit that"})
        post.delete()
        result = {
        "is_delete_success": 1,
        }
        return JsonResponse(result)
        
# UpdatePostAPI
# @permission_classes((IsAuthenticated,))
class UpdatePostAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        pk = request.data.get('pk')
        post = Posts.objects.get(pk=int(pk))
        # Check if it is the original Author
        author = request.user
        if post.author != author:
            return Response({'response': "You don't have permission to edit that"})

        destinations = request.data.get('destinations')
        for destination in destinations:
            if len(Destinations.objects.filter(name__exact=destination)) == 0:
                buildingNewDestination(destination)
            if len(Destinations.objects.filter(name__exact=destination)) == 1:
                city = Destinations.objects.get(name__exact=destination)
                if city not in post.destinations.all():
                    post.destinations.add(Destinations.objects.get(name__exact=city))
        for destination in post.destinations.all():
            if destination.name not in destinations:
                post.destinations.remove(destination)
        post.save()

        content = request.data.get('content')
        post.content = content
        travelExpense = request.data.get('travelExpense')
        post.travelExpense = travelExpense
        travelTime = request.data.get('travelTime')
        post.travelTime = travelTime
        name = request.data.get('name')
        post.name = name
        photoUrl = request.data.get('photoURL')
        # print(photoUrl)
        post.photoUrl = photoUrl
        post.save()

        result = {
        "is_success": 1,
        "pk": post.pk,
        "content":content,
        "author":author.username,
        "name":name,
        "photoURL":photoUrl,
        }

        return JsonResponse(result)

# CheckManagerToken
class CheckManager(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if (len(Token.objects.filter(key=token)) == 0):
            result = {
            "is_success":False
            }
            return JsonResponse(result)

        user = Token.objects.get(key=token).user
        result = {
            "is_success":False
        }
        if user:
            if user.is_manager == True:
                result = {
                    "is_success":True,
                    "is_manager" : True,
                } 
            else:
                result = {
                    "is_success":True,
                    "is_manager" : False,
                }
        else:
            return JsonResponse(result)
        return JsonResponse(result)

# SearchPostByUserAPI
class SearchPostByUserAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        username = request.GET.get('username')

        result = {
            'results':[],
            'is_success': 0,
        }
        if len(User.objects.filter(username=username)) != 0:
            user = User.objects.get(username=username)
            posts = Posts.objects.filter(author=user)
            # result["avatar"] = user.avatar
            for post in posts:
                temp = {
                    "pk": post.id,
                    "name": post.name,
                    "content": post.content,
                    "travelExpense": post.travelExpense,
                    "travelTime": post.travelTime,
                    "publishTime": post.publishTime,
                    "destinations": list(post.destinations.values_list('name', flat=True)),
                    "photoURL": post.photoUrl,
                    'likes': post.likes.count(),
                    'dislikes': post.dislikes.count()
                
                }
                result["results"].append(temp)

          
        result["is_success"] = 1


        return JsonResponse(result)


# SearchPostByDestinationsAPI
class SearchPostByDestinationsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        destinationName = request.GET.get('destination')

        result = {
            'results':[],
            'is_success': 0,
        }

        if len(Destinations.objects.filter(name=destinationName)) != 0:
            destination = Destinations.objects.filter(name=destinationName)
            posts = Posts.objects.all()
            for post in posts:
                if destination in post.destinations.all():
                    temp = {
                        "pk": post.id,
                        "name": post.name,
                        "content": post.content,
                        "travelExpense": post.travelExpense,
                        "travelTime": post.travelTime,
                        "publishTime": post.publishTime,
                        "destinations": list(post.destinations.values_list('name', flat=True))
                    }
                    result["results"].append(temp)

          
        result["is_success"] = 1


        return JsonResponse(result)

# TopDestinationsAPI
class TopDestinationsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        # destinationName = request.GET.get('destination')
        categories = 'likes'

        result = {
            'results':[],
            'is_success': 0,
        }


        topDestinations = Destinations.objects.order_by('-'+categories).filter(score__in=top_scores[:5])

        for destination in topDestinations:
            temp = {
                "name": destination.name,
                "country": destination.country,
                "likes": destination.likes,
                "dislikes": destination.dislikes,
            }
            result["results"].append(temp)
          
        result["is_success"] = 1

        return JsonResponse(result)

# SearchFollowerAPI
class SearchFollowerAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        username = request.GET.get('username')
        print("username",username)

        result = {
            'results':[],
            'is_success': 0,
        }
        
        if len(User.objects.filter(username=username)) != 0:
            user = User.objects.get(username=username)
            followers = user.following.all()
            # result["avatar"] = user.avatar
            for people in followers:
                temp = {
                    "name": people.user.username,
                }
                result["results"].append(temp)
        print(result)
          
        result["is_success"] = 1
        return JsonResponse(result)

# SearchFollowingAPI
class SearchFollowingAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        username = request.GET.get('username')

        result = {
            'results':[],
            'is_success': 0,
        }
        
        if len(User.objects.filter(username=username)) != 0:
            user = User.objects.get(username=username)
            following = user.follower.all()
            # result["avatar"] = user.avatar
            for people in following:
                temp = {
                    "name": people.user.name,
                }
                result["results"].append(temp)
          
        result["is_success"] = 1
        return JsonResponse(result)

# GetUserFromPost
class GetUserFromPost(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        print("here!!!!!")
        # Get the token and username from frontend
        # print(request.data.get('username'))
        print("here!!!!!")

        token = request.GET.get('token')
        # print('i am here!')
        print("here:",token)
        user_original = Token.objects.get(key=token).user
        username = request.GET.get('username')
        user_profile = User.objects.get(username=username)

        # find the customer object of this user
        customer_profile = Customer.objects.get(user=user_profile)
        result = {}

        if user_original == user_profile:
            print("i am myself!")
            result["is_following"] = "self"
            return JsonResponse(result)

        # set up return result
        # result = {}
        result['is_following'] = False 
        if user_original in customer_profile.follower.all():
            result['is_following'] = True

        

        # for follower in customer_profile.follower.all():
        #     if follower.user.username == user_original.username:
        #         result['is_following'] = True
  
        # get all posts sent by profile user
        # posts = Posts.objects.filter(author=user_profile)
        # result['posts'] = []
        # for post in posts:
        #     temp = {
        #         "pk": post.id,
        #         "name": post.name,
        #         "content": post.content,
        #         "travelExpense": post.travelExpense,
        #         "travelTime": post.travelTime,
        #         "publishTime": post.publishTime,
        #         "destinations": list(post.destinations.values_list('name', flat=True))
        #     }
        #     result["posts"].append(temp)
        # result['username'] = user_profile.username
        # result['nickname'] = user_profile.nickname
        print(result) 
        return JsonResponse(result)


# TopHotelsAPI
class TopHotelsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        # destinationName = request.GET.get('destination')
        categories = 'rating'

        result = {
            'results':[],
            'is_success': 0,
        }


        # topHotels = Hotels.objects.order_by('-'+categories).filter(score__in=top_scores[:5])
        topHotels = Hotels.objects.order_by('-'+categories).filter()[:5]
        for hotel in topHotels:
            temp = {
                "name": hotel.name,
                "address": hotel.address,
                "google_rating": hotel.rating,
                "destination": hotel.destination.name,
                "likes": len(hotel.likes.all()),
                "dislikes": len(hotel.dislikes.all()),
            }
            result["results"].append(temp)

          
        result["is_success"] = 1

        return JsonResponse(result)

# TopRestaurantsAPI
class TopRestaurantsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        # destinationName = request.GET.get('destination')
        categories = 'rating'

        result = {
            'results':[],
            'is_success': 0,
        }

        topRestaurants = Resteraunts.objects.order_by('-'+categories).filter()[:5]

        for restaurant in topRestaurants:
            temp = {
                "name": restaurant.name,
                "address": restaurant.address,
                "google_rating": restaurant.rating,
                "destination": restaurant.destination.name,
                "likes": len(restaurant.likes.all()),
                "dislikes": len(restaurant.dislikes.all()),
            }
            result["results"].append(temp)

          
        result["is_success"] = 1

        return JsonResponse(result)

# TopAttractionsAPI
class TopAttractionsAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        # destinationName = request.GET.get('destination')
        categories = 'rating'

        result = {
            'results':[],
            'is_success': 0,
        }


        topAttractions = Attractions.objects.order_by('-'+categories).filter()[:5]

        for attraction in topAttractions:
            temp = {
                "name": attraction.name,
                "address": attraction.address,
                "google_rating": attraction.rating,
                "destination": attraction.destination.name,
                "likes": len(attraction.likes.all()),
                "dislikes": len(attraction.dislikes.all()),
            }
            result["results"].append(temp)

          
        result["is_success"] = 1

        return JsonResponse(result)

# SearchPostByConstraintAPI
class SearchPostByConstraintAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        timeConstraint = [request.data.get('timeLow'),request.data.get('timeHigh')] 
        expenseConstraint = [request.data.get('expenseLow'),request.data.get('expenseHigh')] 

        posts = Posts.objects.all()

        result = {
            'results':[],
            'is_success': 0,
        }

        for post in posts:
            if expenseConstraint[0] <= int(post.travelExpense) <= expenseConstraint[1] and \
            timeConstraint[0] <= int(post.travelTime) <= timeConstraint[1]:
                temp = {
                    "pk": post.id,
                    "name": post.name,
                    "content": post.content,
                    "travelExpense": post.travelExpense,
                    "travelTime": post.travelTime,
                    "publishTime": post.publishTime,
                    "destinations": list(post.destinations.values_list('name', flat=True))
                }
                result["results"].append(temp)

        result["is_success"] = 1

        return JsonResponse(result)


# GetAirplanesAPI
class GetAirplanesAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        ori = request.GET.get('departure').lower()
        des = request.GET.get('destination').lower()
        with open(settings.MEDIA_ROOT + '/airportcodes.csv','r') as outfile:
            reader = csv.reader(outfile)
            IATAmap = defaultdict(list)
            airports = []
            for rows in reader:
                key = rows[0].split(",")[0].lower()
                value = rows[1]
                tup = (key, value)
                airports.append(tup)
            for k, v in airports:
                IATAmap[k].append(v)
        if ori in IATAmap.keys():
            ORI = IATAmap.get(ori)[0] 

        if des in IATAmap.keys():
            DES = IATAmap.get(des)[0]

        time = str(datetime.date.today() + datetime.timedelta(days=1))
        url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/{0}/{1}/{2}".format(ORI,DES,time)
        headers = {
            'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            'x-rapidapi-key': "14e5827ab4mshe3a9655e1062864p1a4401jsnb2e3cc178497"
            }
        try:
            resp = requests.request("GET", url, headers=headers)
            result = {
                'resultsOn': 'Airplanes',
                'results':[]
            }
            place = json.loads(resp.text)["Places"]
            carries = json.loads(resp.text)["Carriers"]
            departure = place[-1]['CityName']
            destination = place[0]['CityName']
            for point in json.loads(resp.text)["Quotes"]:
                carrierId = point['OutboundLeg']['CarrierIds'][0]
                carries = list(filter(lambda x: x['CarrierId']==carrierId, carries))
                airlane = [i['Name'] for i in carries]
                temp = {
                    'price': point['MinPrice'],
                    'Direct': point['Direct'],
                    'Airlanes': airlane,
                    'Departure': departure,
                    'Destination': destination,
                }
                result['results'].append(temp)
            return JsonResponse(result, safe=False)
        except ValidationError:
            result = {
                'resultsOn': 'Airplanes',
                'results':['Sorry, No airport in this city!']
            }
            return JsonResponse(result, safe=False)

# AutoPlannerAPI
class AutoPlannerAPI(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        result = {
        'is_success': False,
        'plan':[]
        }
        destination = request.GET.get('destination')
        if not request.GET.get('days').isdigit():
            return JsonResponse(result)

        days = int(request.GET.get('days'))
        print('destination:', destination)
        print('days:', days)
        if len(Destinations.objects.filter(name__exact=destination)) == 0:
            return JsonResponse(result)

        destination = Destinations.objects.get(name__exact=destination)
        topAttractions = list(Attractions.objects.filter(destination=destination).order_by('-rating'))
        if request.GET.get('shuffle') == 'true':
            random.shuffle(topAttractions)
        autoplan = autoPlanner(topAttractions, days)
        x = 60
        y = -600
        for num_day in range(len(autoplan)):
            width = x
            day_plan = []  
            day_events = autoplan[num_day].events
            time = y
            for num_event in range(len(day_events)):
                event_detail = dict()
                event_detail['name'] = day_events[num_event].name
                event_detail['start_time'] = day_events[num_event].start
                event_detail['end_time'] = day_events[num_event].end
                event_detail['attraction_type'] = day_events[num_event].attractionType
                event_detail['rating'] = day_events[num_event].rating
                event_detail['time'] = day_events[num_event].time
                event_detail['y'] = time
                time += (day_events[num_event].time+1) * 47
                event_detail['address'] = day_events[num_event].address
                event_detail['x'] = width
                day_plan.append(event_detail)
            result["plan"].append(day_plan)

        # result["plan"].append(plan)

        result["is_success"] = True
        return JsonResponse(result, safe=False)


