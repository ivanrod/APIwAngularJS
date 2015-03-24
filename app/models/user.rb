class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User
  has_and_belongs_to_many :elders
end
