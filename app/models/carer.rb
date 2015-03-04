class Carer < ActiveRecord::Base
	has_and_belongs_to_many :elders
end
