require 'z_time_label_day'

# Monkey patch to add timezone to header.
class ZTimeLabelDay < ZTimeLabel

  def self.get_timeblocks(id, t1, t2, inc)
    (super).each do |b|
      b.title = b.starttime.strftime "%a, %b %e  (%Z)"
    end
  end

end
