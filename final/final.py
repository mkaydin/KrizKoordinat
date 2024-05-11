import folium
import geocoder
from pymongo import MongoClient

# Establish a connection to MongoDB
client = MongoClient()

# Select the database
db = client['Geocoder']

# Select the collection
collection = db['Location']

"""
address = "1600 Amphitheatre Parkway, Mountain View, CA"
location = geocoder.osm(address)

print("Latitude:", location.lat)
print("Longitude:", location.lng)

"""

while 1:
    situation = input("enter the situation (for quit put 'q'): ")
    if situation == "q":
        break
    address = input("enter the location: ")
    location = geocoder.osm(address)
    latitude = location.lat
    longitude = location.lng

    data = {
        "Situation": situation,
        "Address": address,
        "Latitude": latitude,
        "Longitude": longitude
    }
    
    result = collection.insert_one(data)
    print("Data inserted with record id", result.inserted_id)
    # Print all documents in the collection
    cursor = collection.find()
    for document in cursor:
        print(document)

