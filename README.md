# HashMapp #

A new way to explore the world.

## What is HashMapp? ##

HashMapp is an application built utilizing Ruby on Rails to allow users to tag geographic locations of interest, organize collections, and share their collections with friends.  It is a fresh concept that works with digital information and physical space to add a new level of exploration to our everday world.

## Technologies used ##

HashMapp is built on a few core technologies: 

*  The back-end is an API built with Rails which serves stored data and views to the fornt end map.  It includes user authentication through Sorcery, file uploading through CarrierWave, geolocation calculations with Geokit, tagging with Acts-as-taggable-on, and a responsive design framework with Zurb Foundation 5.

*  The front-end utilizes heavy Javascript, specifically AJAX, jQuery, and a map API called Leaflet.js.  Our map tiles are served from CloudMade and our geocoding comes from Google Maps.  Our slide out menu is Mmenu.js, a jQuery plugin to create multiple level sliding menus.

## Future features ##

*  Friending other users
*  Friend activity feed
*  Ability to collect specific markers and add them to collections
*  Edit and delete collections from side menu
*  File and video upload on markers
*  Landing page

## About us ##

HashMapp was built during the final sprint at [Bitmaker Labs](http://www.bitmakerlabs.com) by [Michael Sharpe](http://www.github.com/michaelsharpe) and [John Macpherson](https://github.com/jmacpherson).  It is an ongoing project.