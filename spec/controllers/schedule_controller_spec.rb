require 'rails_helper'

RSpec.describe ScheduleController, type: :controller do

  before(:each) do
    # rt = ENV['RSPEC_TIME'] && Time.parse(ENV['RSPEC_TIME'])
    # Tx.reset( rt || Time.now )
    # Tx.reset( Time.now + 16.weeks ) # DST test
    #  => 2013-11-03 16:00:00 -0800
  end


  describe "GET index" do

    it "rebuilds config when reset=true is passed in" do
      # expect(ScheduledResource).to receive(:config_from_yaml)
      expect(ScheduledResource::Config).to receive(:from_base)
      get :index, reset: true
    end

  end


  describe "GET schedule" do
    let(:response) { get(:schedule) }
    let(:result) { JSON.parse(response.body) }

    it "returns JSON with 'meta' configuration data" do
      expect( result.keys ).to include('meta')
    end

    it "returns JSON with 'meta' configuration data" do
      expect( result['meta'].keys ).to include( *%w{rsrcs
                                                    min_time
                                                    max_time
                                                    t1 t2 inc} )
    end

  end




end

