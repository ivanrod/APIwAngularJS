class RelateUsersAndElders < ActiveRecord::Migration
  def change
  	create_table :elders_users, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :elder, index: true
    end
  end
end
