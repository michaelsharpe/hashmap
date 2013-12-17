json.array! @geomarkers do |geomarker|
  json.id geomarker.id
  json.name geomarker.name
  json.description geomarker.description
  json.latitude geomarker.latitude
  json.longitude geomarker.longitude
  json.tag_list geomarker.tag_list
  json.image do
    json.url geomarker.image.url
    json.thumb geomarker.image.thumb.url
  end
end