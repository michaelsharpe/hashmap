Hashmap::Application.routes.draw do
  root to: "geomarkers#index"
  get "signup" => "users#new", as: "signup"
  get "signin" => "sessions#new", as: "signin"
  get "signout" => "sessions#destroy", as: "signout"

  resources :users, only: [:new, :show, :create, :destroy]
  resources :sessions, only: [:index, :new, :create, :destroy]
  resources :geomarkers
end
