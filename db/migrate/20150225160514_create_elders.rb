class CreateElders < ActiveRecord::Migration
  def change
    create_table :elders do |t|
      t.string :userId
      t.string :name
      t.string :address
      t.string :phone

      t.timestamps
    end
  end
end
