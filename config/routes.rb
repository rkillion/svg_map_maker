Rails.application.routes.draw do
  namespace :api do
    resources :features
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
    get "/grids/:id", to: "grids#show"
    post "/mapedits", to: "shapes#process_mapedits"
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
