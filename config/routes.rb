Rails.application.routes.draw do
  resources :views
  resources :shapes
  resources :tile_relationships
  resources :tiles
  resources :shape_types
  resources :shape_classes
  resources :worlds
  resources :universes
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
