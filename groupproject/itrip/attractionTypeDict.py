
# "1 hour:"
oneHour = [
"bakery",
"bar",
"book_store",
"cafe",
"cemetery",
"city_hall",
"embassy",
"courthouse",
"library",
"local_government_office",
"restaurant",
"stadium",
"train_station",
"transit_station",
"establishment",
"premise",
"food",

]



# 2 hours:
twoHour = [
"art_gallery",
"hindu_temple",
"mosque",
"church",
"school",
"synagogue",
"tourist_attraction",
"university",
"natural_feature",
"neighborhood",
"place_of_worship",
"point_of_interest"
]

# 3 hours:
threeHour = [
"campground",
"zoo",
"aquarium",
"amusement_park",
"casino",
"museum",
"park"
]



attractionTypeDict = {}

for attractionType in oneHour:
	attractionTypeDict[attractionType] = 1

for attractionType in twoHour:
	attractionTypeDict[attractionType] = 2

for attractionType in threeHour:
	attractionTypeDict[attractionType] = 3


	