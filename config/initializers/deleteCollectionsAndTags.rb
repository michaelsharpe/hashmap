def delete_collections_and_tags(user, from, to)
  collections = Range.new(from, to)
  collections.each do |i|
    collection = user.collections.find(i)
    collection.collectionTags.each do |tag|
      tag.destroy
    end
    collection.destroy
  end
end