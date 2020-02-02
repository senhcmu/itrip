# This is all the urls for the backend which is separated from front end and they should have different urls path
# to make this work
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from .api import DestinationsViewsets, DestinationsCountryViewsets, PostsViewsets \
,PostsDetailView, GetAttractionsAPI, AttractionsDetailView, HotelsViewsets, HotelsDetailView \
,PostsDetailView, PostsViewsets, ResterauntsViewsets, ResterauntsDetailView \
,GetHotelsAPI, GetRestaurantsAPI, AttractionsViewsets,GetAirplanesAPI, UpdatePostAPI, PublishPostAPI \
,SearchPostByUserAPI, SearchPostByDestinationsAPI, SearchPostByConstraintAPI, TopDestinationsAPI \
,TopRestaurantsAPI, TopHotelsAPI, TopAttractionsAPI, DeletePostAPI, LikeAPI, DislikeAPI, AutoPlannerAPI \
,FollowAPI, UnfollowAPI, GetUserFromPost, CheckManager, GetPostAPI, SearchFollowerAPI, SearchFollowingAPI


# PublishPostAPI, GetPostAP

from django.urls import path, include
from django.conf.urls import url
from itrip.views import registration_view, login_view, LogoutView, auto_registration_view
from itrip import views

router = routers.DefaultRouter()
router.register('api/destinations', DestinationsViewsets, 'destinations')
# router.register('api/posts', PostsViewsets, 'posts')
router.register('api/attractions', AttractionsViewsets, 'attractions')
router.register('api/hotels', HotelsViewsets, 'hotels')
router.register('api/restaurants', ResterauntsViewsets, 'restaurants')

# router.register('get_attractions', GetAttractionsAPI, 'get_attractions')
# router.register('destinations', DestinationsViewsets, 'destinations')
# router.register('destinations', DestinationsViewsets, 'destinations')

urlpatterns = [ 

    # path('', views.dash, name='dash'),
    path('', include(router.urls)),
    path('register/', registration_view, name='register'),
    path('autoRegister/', auto_registration_view, name='autoRegister'),
    path('login/', login_view, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here
    path('api/destinationsbycountry/', DestinationsCountryViewsets.as_view()),
    # path('api/attractions/<pk>/', AttractionsDetailView.as_view()),
    path('api/hotels/<pk>/', HotelsDetailView.as_view()),
    path('api/restaurants/<pk>/', ResterauntsDetailView.as_view()),
    path('api/posts/<pk>/', PostsDetailView.as_view()),
    path('api/posts/', GetPostAPI.as_view()),


    url(r'api/get_attractions/$', GetAttractionsAPI.as_view()),

    url(r'api/top_destinations/$', TopDestinationsAPI.as_view()),
    url(r'api/top_attractions/$', TopAttractionsAPI.as_view()),
    url(r'api/top_hotels/$', TopHotelsAPI.as_view()),
    url(r'api/top_restaurants/$', TopRestaurantsAPI.as_view()),

    url(r'api/get_hotels/$', GetHotelsAPI.as_view()),
    url(r'api/get_restaurants/$', GetRestaurantsAPI.as_view()),
    url(r'get_airplanes/$', GetAirplanesAPI.as_view()),
    url(r'publishpost', PublishPostAPI.as_view()),
    url(r'deletepost', DeletePostAPI.as_view()),
    url(r'updatepost', UpdatePostAPI.as_view()),
    url(r'checkmanager', CheckManager.as_view()),


    url(r'api/like', LikeAPI.as_view()),
    url(r'api/dislike', DislikeAPI.as_view()),
    url(r'api/pro/$', GetUserFromPost.as_view()),
    url(r'api/follow', FollowAPI.as_view()),
    url(r'api/unfollow', UnfollowAPI.as_view()),

    url(r'searchpostbyuser/$', SearchPostByUserAPI.as_view()),
    url(r'searchpostbydestinations/$', SearchPostByDestinationsAPI.as_view()),
    url(r'searchpostbyconstraints/$', SearchPostByConstraintAPI.as_view()),


    url(r'tophotels/$', TopHotelsAPI.as_view()),
    url(r'toprestaurants/$', TopRestaurantsAPI.as_view()),
    url(r'topattractions/$', TopAttractionsAPI.as_view()),
    url(r'topdestinations/$', TopDestinationsAPI.as_view()),
    url(r'api/autoplanner/$', AutoPlannerAPI.as_view()),
    url(r'follower/$', SearchFollowerAPI.as_view()),
    url(r'following/$', SearchFollowingAPI.as_view()),


    
    # url(r'publishpost/$', PublishPostAPI.as_view()),
    # url(r'get_posts/$', GetPostAPI.as_view()),

]

