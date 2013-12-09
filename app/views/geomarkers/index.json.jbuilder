json.array! @geomarkers do |geomarker|
  json.name geomarker.name
  json.description geomarker.description
  json.latitude geomarker.latitude
  json.longitude geomarker.longitude
  json.tags geomarker.tag_list
end