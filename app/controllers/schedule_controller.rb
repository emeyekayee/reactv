# Needed this here to get the ZTime* classes in time for session.
require 'scheduled_resource'
require 'custom_headers'

class ScheduleController < ApplicationController
  include ScheduledResource::Helper

  before_action :ensure_schedule_config


  # Returns trivial react page w/ layout application.html.erb which
  # in turn fetches data.
  def index
  end


  # Json data.
  def schedule
    get_data_for_time_span

    render json: @blockss
  end

end
