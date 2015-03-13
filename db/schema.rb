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

ActiveRecord::Schema.define(version: 20130831181146) do

  create_table "crew", id: false, force: :cascade do |t|
    t.string "program", limit: 14, null: false
    t.string "name",    limit: 41, null: false
    t.string "role",    limit: 30
  end

  add_index "crew", ["name"], name: "name", using: :btree
  add_index "crew", ["program"], name: "program", using: :btree

  create_table "events", id: false, force: :cascade do |t|
    t.string   "program",        limit: 14, null: false
    t.integer  "station",        limit: 4,  null: false
    t.datetime "time",                      null: false
    t.datetime "etime",                     null: false
    t.integer  "duration",       limit: 4,  null: false
    t.integer  "startDate",      limit: 4,  null: false
    t.integer  "startTime",      limit: 4,  null: false
    t.integer  "weekday",        limit: 4,  null: false
    t.boolean  "new",            limit: 1
    t.boolean  "stereo",         limit: 1
    t.boolean  "subtitled",      limit: 1
    t.boolean  "hdtv",           limit: 1
    t.boolean  "closeCaptioned", limit: 1
    t.boolean  "ei",             limit: 1
    t.string   "tvRating",       limit: 5
    t.string   "dolby",          limit: 30
    t.integer  "partNumber",     limit: 4
    t.integer  "partTotal",      limit: 4
  end

  add_index "events", ["program", "station"], name: "program", using: :btree
  add_index "events", ["startDate"], name: "startDate", using: :btree
  add_index "events", ["startTime"], name: "startTime", using: :btree
  add_index "events", ["weekday"], name: "weekday", using: :btree

  create_table "genre", id: false, force: :cascade do |t|
    t.string  "program",   limit: 14, null: false
    t.string  "genre",     limit: 30, null: false
    t.integer "relevance", limit: 4,  null: false
  end

  add_index "genre", ["genre"], name: "genre", using: :btree
  add_index "genre", ["program"], name: "program", using: :btree

  create_table "lineup", force: :cascade do |t|
    t.string "name",       limit: 42, null: false
    t.string "location",   limit: 28, null: false
    t.string "device",     limit: 30
    t.string "type",       limit: 20, null: false
    t.string "postalCode", limit: 6
  end

  create_table "map", id: false, force: :cascade do |t|
    t.string   "lineup",       limit: 12, null: false
    t.integer  "station",      limit: 4,  null: false
    t.integer  "channel",      limit: 4
    t.integer  "channelMinor", limit: 4
    t.datetime "validFrom"
    t.datetime "validTo"
    t.datetime "onAirFrom"
    t.datetime "onAirTo"
  end

  add_index "map", ["station"], name: "station", using: :btree

  create_table "program", force: :cascade do |t|
    t.string  "series",                  limit: 10
    t.string  "title",                   limit: 120, null: false
    t.string  "subtitle",                limit: 150
    t.string  "description",             limit: 255
    t.string  "mpaaRating",              limit: 5
    t.string  "starRating",              limit: 5
    t.integer "runTime",                 limit: 4
    t.integer "year",                    limit: 4
    t.string  "showType",                limit: 30
    t.string  "colorCode",               limit: 20
    t.date    "originalAirDate"
    t.string  "syndicatedEpisodeNumber", limit: 20
    t.string  "advisories",              limit: 190
    t.string  "lgenre",                  limit: 130
  end

  add_index "program", ["title", "subtitle", "description"], name: "text", type: :fulltext
  add_index "program", ["title"], name: "title", using: :btree
  add_index "program", ["year"], name: "year", using: :btree

  create_table "schedule", id: false, force: :cascade do |t|
    t.string   "program",        limit: 14, null: false
    t.integer  "station",        limit: 4,  null: false
    t.datetime "time",                      null: false
    t.datetime "etime",                     null: false
    t.integer  "duration",       limit: 4,  null: false
    t.integer  "startDate",      limit: 4,  null: false
    t.integer  "startTime",      limit: 4,  null: false
    t.integer  "weekday",        limit: 4,  null: false
    t.boolean  "new",            limit: 1
    t.boolean  "stereo",         limit: 1
    t.boolean  "subtitled",      limit: 1
    t.boolean  "hdtv",           limit: 1
    t.boolean  "closeCaptioned", limit: 1
    t.boolean  "ei",             limit: 1
    t.string   "tvRating",       limit: 5
    t.string   "dolby",          limit: 30
    t.integer  "partNumber",     limit: 4
    t.integer  "partTotal",      limit: 4
  end

  add_index "schedule", ["program", "station"], name: "program", using: :btree
  add_index "schedule", ["startDate"], name: "startDate", using: :btree
  add_index "schedule", ["startTime"], name: "startTime", using: :btree
  add_index "schedule", ["weekday"], name: "weekday", using: :btree

  create_table "station", force: :cascade do |t|
    t.string  "callSign",         limit: 10, null: false
    t.string  "name",             limit: 40, null: false
    t.string  "affiliate",        limit: 25
    t.integer "fccChannelNumber", limit: 4
  end

end
