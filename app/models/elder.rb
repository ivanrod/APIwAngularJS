class Elder < ActiveRecord::Base
	has_and_belongs_to_many :carers
	has_and_belongs_to_many :users
end
