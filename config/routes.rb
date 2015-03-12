Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/auth'

  mount_devise_token_auth_for 'Admin', at: 'admin_auth'
  as :admin do
    # Define routes for Admin within this block.
  end

  root 'static_pages#home'

  get 'signIn' => 'users#sign_in'

#AJAX Static Pages calls
  get 'groups' => 'static_pages#send_groups'
  post 'group_alerts' => 'static_pages#send_groups_alerts_last_7days'
  post 'group_payloads' => 'static_pages#send_groups_latest_payload'

  post 'get_elder_data' => 'static_pages#get_elder_data'
  post 'get_all_user_alerts' => 'static_pages#get_all_user_alerts'
  post 'edit_elder_data' => 'static_pages#edit_elder_data'
  post 'get_latest_payload_from_group' => 'static_pages#get_latest_payload_from_group'

  get 'carers' => 'static_pages#get_carers'
  post 'edit_carer_data' => 'static_pages#edit_carer_data'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end 

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
