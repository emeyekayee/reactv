require 'rails_helper'

RSpec.describe ScheduledResource, type: :model do
  my_fake_session = {}

  let(:session){ my_fake_session }

  let(:config) do 
    ScheduledResource.ensure_config(session)
    ScheduledResource.config 
  end


  it "creates a configuration hash" do
    expect(config).to be_a(Hash)
  end


  it "configures basic parameters" do
    expect(config.keys).to include(
                                    :all_resources,
                                    :rsrc_of_tag,
                                    :block_class_for_resource_kind,
                                    :visible_time,
                                    :time_range_min,
                                    :time_range_max,
                                    :rsrcs_by_kind
                                  )
  end


  it "configures reasonable time values" do
    expect( ScheduledResource.visible_time ).to be_a(Numeric)
    expect( ScheduledResource.visible_time ).to be > 0
  end


  # For some browsers (Chrome, at least) DOM pixel geometries are limited
  # in scale even if outside clipping range.  A practical fix for now is
  # just to limit the ratio of the maximum range to the visible time range.
  it "configures a practical time range" do
    expect( config[:time_range_max] ).to be_a(Time)
    expect( config[:time_range_min] ).to be_a(Time)

    # As of scheduled_resource v0.0.2 
    max_range = config[:time_range_max] - config[:time_range_min]

    ratio = max_range / ScheduledResource.visible_time
    expect( 1 .. 400 ).to include(ratio)
  end


  # As of Rails 4.1, default cookie session_store serializes with
  # JSON instead of Marshal.  Class objects (esp ActiveRecord classes)
  # can cause nastiness.  Should have been class *names* anyway.
  it "does not store Class objects in config" do
    classes = config[:block_class_for_resource_kind].values.map(&:class)
    expect( classes.uniq ).to be == [String]
  end

  
end
