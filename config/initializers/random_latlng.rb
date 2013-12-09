class Random
  def location(lat, lng, max_dist_meters)
    max_radius = Math.sqrt((max_dist_meters ** 2) / 2.0)
    lat_offset = rand(10 ** (Math.log10(max_radius/ 1.11) - 5))
    lng_offset = rand(10 ** (Math.log10(max_radius/ 1.11) - 5))

    lat += [1, -1].sample * lat_offset
    lng += [1, -1].sample * lng_offset
    lat = [[-90, lat].max, 90].min
    lng = [[-180, lng].max, 180].min
    [lat, lng]
  end
end