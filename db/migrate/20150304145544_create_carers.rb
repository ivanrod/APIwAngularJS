class CreateCarers < ActiveRecord::Migration
  def change

    create_table :carers do |t|
      t.string :name

      t.timestamps
    end
    create_table :carers_elders, id: false do |t|
      t.belongs_to :carer, index: true
      t.belongs_to :elder, index: true
    end
  end
end
