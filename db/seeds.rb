# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def address()
  r = Random.new
  number = r.rand(100..400)
end

def location()
  loc = Random.new.location(43.6464941, -79.39257729999997, 5000)
end

1000.times do |num|
  location = location()
  lat = location[0]
  lng = location[1]
  Geomarker.create(name: Faker::Name.name, description: Faker::Company.catch_phrase,latitude: lat, longitude: lng)
end