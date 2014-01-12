# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tags = %w(cherry, maple, oak, tree, bush, fruit, ginko, sale, shoes, nike, gap, vegetarian, mexican, cheap food, restaurant, architecture, arts and craft movement, art deco, art nouveau, modern)

def address()
  r = Random.new
  number = r.rand(100..400)
end

def location()
  loc = Random.new.location(43.6464941, -79.39257729999997, 5000)
end

def createCollection(user, collection_name, *tags)
  collection = Collection.create!(name: collection_name, description:Faker::Company.bs, user_id: user.id)
  tags.each do |tagName|
    tag_name = tagName
    tag = collection.collectionTags.create!(name:tag_name, user_id: user.id, visibility: false)
    tag.tag_list = tag_name
    tag.save
  end
end

if (User.find_by username: "user") == nil
  @user = User.create!(username: "user", email: "test@test.com", password: "test888", password_confirmation: "test888")
else
  @user = User.find_by username: "user"
end

if (User.find_by username: "user2") == nil
  @user2 = User.create!(username: "user2", email: "test2@test.com", password: "test888", password_confirmation: "test888")
else
  @user2 = User.find_by username: "user2"
end

500.times do |num|
  location = location()
  lat = location[0]
  lng = location[1]
  geomarker = Geomarker.new(name: Faker::Name.name, description: Faker::Company.catch_phrase,latitude: lat, longitude: lng, user_id: @user.id)
  geomarker.tag_list = tags.sample(3).join(', ')
  geomarker.save
end

500.times do |num|
  location = location()
  lat = location[0]
  lng = location[1]
  geomarker = Geomarker.new(name: Faker::Name.name, description: Faker::Company.catch_phrase,latitude: lat, longitude: lng, user_id: @user2.id)
  geomarker.tag_list = tags.sample(3).join(', ')
  geomarker.save
end

createCollection(@user2, "plants", "cherry", "maple", "oak", "tree", "bush", "fruit", "ginko")
createCollection(@user2, "architecture", "architecture", "arts and crafts movement", "art deco", "art nouveau", "modern")
createCollection(@user2, "shopping", "sale", "shoes", "nike", "gap")
createCollection(@user2, "food", "vegetarian", "cheap food", "restaurant", "mexican")

createCollection(@user, "plants", "cherry", "maple", "oak", "tree", "bush", "fruit", "ginko")
createCollection(@user, "architecture", "architecture", "arts and crafts movement", "art deco", "art nouveau", "modern")
createCollection(@user, "shopping", "sale", "shoes", "nike", "gap")
createCollection(@user, "food", "vegetarian", "cheap food", "restaurant", "mexican")
