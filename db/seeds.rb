# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tags = %w(fruit tree dumpster restaurant gingerbread graffiti streetcar black_market_eggs santa_hat clothing book souffle infundibulum)

def address()
  r = Random.new
  number = r.rand(100..400)
end

def location()
  loc = Random.new.location(43.6464941, -79.39257729999997, 5000)
end

@user = User.create!(username: "user", email: "test@test.com", password: "test888", password_confirmation: "test888")
@user2 = User.create!(username: "user2", email: "test2@test.com", password: "test888", password_confirmation: "test888")

500.times do |num|
  location = location()
  lat = location[0]
  lng = location[1]
  geomarker = Geomarker.create(name: Faker::Name.name, description: Faker::Company.catch_phrase,latitude: lat, longitude: lng, user_id: @user.id)
  geomarker.tag_list = tags.sample(3).join(', ')
  geomarker.save
end

500.times do |num|
  location = location()
  lat = location[0]
  lng = location[1]
  geomarker = Geomarker.create(name: Faker::Name.name, description: Faker::Company.catch_phrase,latitude: lat, longitude: lng, user_id: @user2.id)
  geomarker.tag_list = tags.sample(3).join(', ')
  geomarker.save
end

10.times do |num|
  collection = Collection.create(name:Faker::Commerce.department, description:Faker::Company.bs, user_id: @user.id )
  3.times do
    tag_name = tags.sample
    tag = collection.collectionTags.create(name:tag_name, user_id: @user.id, visibility: false)
    tag.tag_list = tag_name
    tag.save
  end
  collection.save
end

10.times do |num|
  collection = Collection.create(name:Faker::Commerce.department, description:Faker::Company.bs, user_id: @user2.id )
  3.times do
    tag_name = tags.sample
    tag = collection.collectionTags.create(name:tag_name, user_id: @user.id, visibility: false)
    tag.tag_list = tag_name
    tag.save
  end
  collection.save
end