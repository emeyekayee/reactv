#Reactv

This Rails app demonstrates use of the ScheduledResource gem which
you can read about [here](https://github.com/emeyekayee/scheduled_resource)
and install from [RubyGems.org](https://rubygems.org)

The gem creates a web display of how things (_resources_) are used
over time and takes its data from Rails models.  Normally these would
be ActiveRecord (or similar) classes but any class will do as long
as it supports the methods described by the gem.  So in fact what appears
in the schedule as headers and time labels is queried from the
server and rendered on the client with the same code paths, except
for actual database access.  The time headers then are ideal mock
data for testing or demonstration.

##Setup

Following the usual procedure:

    $ git clone https://github.com/emeyekayee/reactv.git
    $ cd reactv
    $ bundle
    $ rails s

Database setup should not be needed unless you are going to run the
tests.  Browse to (http://0.0.0.0:3000/schedule/index) and you should see
the four time-header rows specified by the sample config file in

    config/resource_schedule.yml

The headers display in two different timezones and you will be able to
scroll the schedule horizontally and observe more data being fetched
from the server.

Shortly after scrolling you should see the label text re-justified to
the center.  This addresses one of the key issues in a scrolled
display like this -- keeping the content visible while maintaining
a smooth scrolling action.



The demo is built with Rails 4.2, Ruby 2.2.0 and MySQL.

##Tests

Run

    $ rake db:create test

(even though the tests do not use the database).  Then,

    $ bundle exec rspec

to run the tests.
