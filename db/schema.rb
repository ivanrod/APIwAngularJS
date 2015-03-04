# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150304145544) do

  create_table "carers", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "carers_elders", id: false, force: true do |t|
    t.integer "carer_id"
    t.integer "elder_id"
  end

  add_index "carers_elders", ["carer_id"], name: "index_carers_elders_on_carer_id"
  add_index "carers_elders", ["elder_id"], name: "index_carers_elders_on_elder_id"

  create_table "elders", force: true do |t|
    t.string   "userId"
    t.string   "name"
    t.string   "address"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
