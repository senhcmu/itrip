from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext as _

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from rest_framework.authtoken.models import Token

# Create your models here.

class MyAccountManager(BaseUserManager):
	def create_user(self, username, nickname, password):
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			username=username,
			nickname=nickname,
		)

		user.set_password(password)
		user.is_staff = False
		user.save(using=self._db)
		return user
	
	def create_superuser(self, username, nickname, password):
		user = self.create_user(
            username,
			nickname,
            password,
        )
		user.is_admin = True
		user.is_staff = True
		user.is_manager = True
		user.is_superuser = True
		user.save(using=self._db)
		return user


class User(AbstractBaseUser, PermissionsMixin):
	# email = models.EmailField(verbose_name="email", max_length=60, unique=True)
	username = models.CharField(max_length=30, unique=True)
	nickname = models.CharField(max_length=30)
	# avatar = models.URLField(blank=True)
	date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	is_customer = models.BooleanField("customer status", default=True)
	is_manager = models.BooleanField("manager status", default=False)
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['nickname']
	objects = MyAccountManager()

	def __str__(self):
		return self.username

	is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )

class Manager(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
	class Meta:
		verbose_name = ("Manager")
		verbose_name_plural = ("Managers")
	def __str__(self):
	        return self.user.username #name to be shown when called

class Customer(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
	follower = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="follower", blank=True)
	following = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="following", blank=True)
	class Meta:
		verbose_name = ("Customer")
		verbose_name_plural = ("Customers")

	def __str__(self):
	        return self.user.username #name to be shown when called

class Destinations(models.Model):
	name = models.CharField(max_length=100, unique=True)
	country = models.CharField(max_length=100)
	# rating = models.DecimalField(max_digits=4, decimal_places=2)

	# hasBeen = models.ManyToManyField(Customer, through="CustomerhasBeenDestination", related_name="CustomerandDestination")
	likes = models.ManyToManyField(Customer, related_name="CustomerandDestination_like",blank=True)
	dislikes = models.ManyToManyField(Customer, related_name="CustomerandDestination_dislike",blank=True)

	class Meta:
		verbose_name = ("Destination")
		verbose_name_plural = ("Destinations")

	def __str__(self):
	        return self.name #name to be shown when called

class Attractions(models.Model):
	name = models.CharField(max_length=100)
	destination = models.ForeignKey(Destinations, on_delete=models.CASCADE)
	rating = models.DecimalField(max_digits=4, decimal_places=2)
	address = models.CharField(max_length=200)
	time = models.IntegerField()
	photo = models.URLField(blank=True)
	attractionType = models.CharField(max_length=20)
	# post = models.ForeignKey(Post, on_delete=CASCADE)
	likes = models.ManyToManyField(User,related_name="CustomerandAttraction_like",blank=True)
	dislikes = models.ManyToManyField(User, related_name="CustomerandAttraction_dislike",blank=True)
	# hasBeen = models.ManyToManyField(User, related_name="CustomerandAttractions",blank=True)
	# city = models.ManField(Destination, through="AttractionInDestination", related_name="AttractionandDestination")

	class Meta:
		verbose_name = ("Attraction")
		verbose_name_plural = ("Attractions")


	def __str__(self):
	        return self.name #name to be shown when called



class Resteraunts(models.Model):
	name = models.CharField(max_length=100)
	destination = models.ForeignKey(Destinations, on_delete=models.CASCADE)
	address = models.CharField(max_length=200)
	rating = models.DecimalField(max_digits=4, decimal_places=2)
	photo = models.URLField(blank=True)
	# post = models.ForeignKey(Post, on_delete=CASCADE)
	likes = models.ManyToManyField(Customer, related_name="CustomerandResteraunts_like",blank=True)
	dislikes = models.ManyToManyField(Customer, related_name="CustomerandResteraunts_dislike",blank=True)
	# hasBeen = models.ManyToManyField(Customer, through="CustomerhasBeenAttractions", related_name="CustomerandAttractions")
	## city = models.ManyToManyField(Destination, through="AttractionInDestination", related_name="AttractionandDestination")

	class Meta:
		verbose_name = ("Resteraunt")
		verbose_name_plural = ("Resteraunt")


	def __str__(self):
	        return self.name #name to be shown when called



class Hotels(models.Model):
	name = models.CharField(max_length=100)
	destination = models.ForeignKey(Destinations, on_delete=models.CASCADE)
	rating = models.DecimalField(max_digits=4, decimal_places=2)
	# post = models.ForeignKey(Post, on_delete=CASCADE)
	address = models.CharField(max_length=200)
	photo = models.URLField(blank=True)
	likes = models.ManyToManyField(Customer, related_name="CustomerandHotels_like",blank=True)
	dislikes = models.ManyToManyField(Customer, related_name="CustomerandHotels_dislike",blank=True)
	# hasBeen = models.ManyToManyField(Customer, through="CustomerhasBeenAttractions", related_name="CustomerandAttractions")
	## city = models.ManyToManyField(Destination, through="AttractionInDestination", related_name="AttractionandDestination")

	class Meta:
		verbose_name = ("Hotel")
		verbose_name_plural = ("Hotels")


	def __str__(self):
	        return self.name #name to be shown when called

class Posts(models.Model):
	name = models.CharField(max_length=100)
	content = models.TextField()
	publishTime = models.DateTimeField(auto_now_add=True)
	author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="CustomerandPosts_like",blank=True)
	dislikes =  models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="CustomerandPosts_dislikes",blank=True)
	# IMPORTANT, when create, needs destination pk value
	destinations = models.ManyToManyField(Destinations, related_name="postsOnDestinations", blank=True)
	travelTime = models.IntegerField(default=0, blank=True)
	travelExpense = models.IntegerField(blank=True)
	photoUrl = models.URLField(blank=True)

	class Meta:
		verbose_name = ("Post")
		verbose_name_plural = ("Posts")

	def __str__(self):
	    return self.name #name to be shown when called


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)
