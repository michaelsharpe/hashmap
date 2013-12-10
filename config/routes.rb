Hashmap::Application.routes.draw do
  root to: "maps#index"
  
  get "signup" => "users#new", as: "signup"
  get "signin" => "sessions#new", as: "signin"
  get "signout" => "sessions#destroy", as: "signout"

  resources :users, only: [:new, :show, :create, :destroy] do
    resources :collections
  end
  resources :sessions, only: [:index, :new, :create, :destroy]
  resources :geomarkers
end
