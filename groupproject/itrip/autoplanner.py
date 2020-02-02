
"""

We assume there is one one hour between each attration
We assume the available time for a tourist each day is from 9AM to 8PM
We asusme the time spend on each attration based on the attraction type


"""

# 2 hours:
# art_gallery
# hindu_temple
# mosque
# church
# school
# synagogue
# tourist_attraction
# university
# natural_feature
# neighborhood
# place_of_worship
# point_of_interest


# 1 hour:
# bakery
# bar
# book_store
# cafe
# cemetery
# city_hall
# embassy
# courthouse
# library
# local_government_office
# restaurant
# stadium
# train_station
# transit_station
# establishment


# 3 hours:
# campground
# zoo
# aquarium
# amusement_park
# casino
# museum
# park



class Event:
	def __init__(self, name, time, attractionType, rating, address):
		self.time = time
		self.start = None
		self.end = None
		self.day = None
		self.name = name
		self.rating = float(rating)
		self.address = address
		self.attractionType = attractionType



class Day:
	def __init__(self, number, start, end):
		self.number = number
		self.is_full = False
		self.events = []

	def checkIsFull(self):
		self.is_full = True
		if len(self.events) == 0:
			self.is_full = False
			return self.is_full
		if self.events[0].start - 9 >= 2:
			self.is_full = False
			return self.is_full
		if 20 - self.events[-1].end >= 2:
			self.is_full = False
			return self.is_full

		for event in range(1, len(self.events)):
			if self.events[event].start - self.events[event-1].end >= 2:
				self.is_full = False
				return self.is_full
		return self.is_full

	# def addEvent(self, event, start):

def daysNotFull(days):
	for day in days:
		if not day.checkIsFull():
			return False
	return True


def autoPlanner(topAttractions, numberOfDays):
	attractions = []
	for attraction in topAttractions:
		attractions.append(Event(attraction.name, attraction.time, attraction.attractionType, attraction.rating, attraction.address))

	days = []
	for day in range(numberOfDays):
		days.append(Day(day+1, 9, 20))
	# print(len(attractions))
	# print(daysNotFull(days))


	while len(attractions) > 0 and not daysNotFull(days):
		insert = False
		for day in range(numberOfDays):
			if len(attractions) == 0:
				break
			if len(days[day].events) == 0:
				print(day)
				attractions[0].start = 9
				attractions[0].end = attractions[0].start + attractions[0].time
				attractions[0].day = day+1
				days[day].events.append(attractions[0])
				attractions = attractions[1:]
				insert = True
			elif 20 - days[day].events[-1].end >= 1 + attractions[0].time:
				attractions[0].start = days[day].events[-1].end + 1
				attractions[0].end = attractions[0].start + attractions[0].time
				attractions[0].day = day
				days[day].events.append(attractions[0])
				attractions = attractions[1:]
				insert = True
			else:
				continue
		if insert == False:
			attractions = attractions[1:]
	return days




























