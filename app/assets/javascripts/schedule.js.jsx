/** @jsx React.DOM */


var ScheduleContainer = React.createClass({
  getInitialState: function() {
    return {
             meta:      {},    // Set later from @init_resources() (maybe).
             rsrcs:     [],    // Defines ordered set of rows.
             timespans: {}     // React components, indexed by rsrc_tag. 
            };
  },


  // Based just on browser window.
  init_display_parms: function () {
    TimePix.set_display_parms()
  },

  // Use this '$.extend({}, obj)' to copy obj.
  // Immutable state is recommended
  copy_ary: function( ary ) {
    var dup = [];
    ary.forEach( function(elt) {dup.push( elt )} );
    return dup;
  },

  // Called after first data-load done()
  init_resources: function () {
    this.init_display_parms()

    // Defines order of rows
    var rsrcs = UseBlock.rsrcs = TimePix.meta.rsrcs;

    var state = {
      rsrcs:  this.copy_ary(rsrcs)
    }

    window.TopResourceSchedule = this  // scroll_monitor needs this.

    this.setState( state
    //                     , function (){
    //   setTimeout( TimePix.scroll_to_tlo,    100 )
    //   setTimeout( TimePix.set_time_cursor, 1000 )
    //   setTimeout( TimePix.scroll_monitor,   100 )
    // }
     );
  },


  make_url_query: function (t1, t2, inc) { // fka make_url
    var url = this.props.url;   // '/schedule.json' ?
    if (t1 || t2 || inc) {
      url += '?t1=' + t1 + '&t2=' + t2 + '&inc=' + inc
    }
    return url
  },


  loadScheduleFromServer: function (t1, t2, inc) { // fka get_data()
    var full_url = this.make_url_query()

    this.busy    = true;

    return $.ajax({
      url:       full_url,
      dataType:  'json',
      context:   this      // for handler methods
    })
    .done( function(data) { // fka success
      TimePix.merge_metadata(data)
      delete data.meta
      this.json_data = data; // PARK this here until we consume it.

      // init_resources() basically handles meta-data.  MAYBE it should
      // be called every time to make the display more dynamic.
      if (! inc) { this.init_resources() };
  
      // TERMINATES BY COMPLETING this.setState() (above) and poking
      // any existing timespan components to incorporate their data
      // from the remaining this.json_data.
      Object.keys(this.registeredTimespans).forEach( function(rsrc_tag) {
        this.registeredTimespans[rsrc_tag].add_blocks()
      });
    })
    .fail( function(xhr, status, err) { // fka error
        console.error(full_url, status, err.toString());
      })
    .always( function() {
      this.busy = false;
    });
  },


  rq_data: function(t1, t2, inc) {
    if (! this.busy ) {
      this.loadScheduleFromServer( t1, t2, inc )
    }
  },

  // resource_tags: function() {return Object.keys(this.json_data)},

  more_data: function() {
    this.rq_data( TimePix.thi, TimePix.next_hi(), 'hi' )
  },

  less_data: function() {
    this.rq_data( TimePix.next_lo(), TimePix.tlo, 'lo' )
  },


  registeredTimespans: {},

  register_timespan: function ( ts_component, rsrc_tag ) {
    this.registeredTimespans[rsrc_tag] = ts_component;
    ts_component.add_blocks();
  },


  // this.state       has top-level data -- meta:, rsrcs:, res_tags:
  // this.json_data   has received block-use data by tag
  render: function() {
    var self  = this;
    var rsrcs = this.state.rsrcs;

    //   <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    return (
      <div className="schedule-container">
        <LabelsContainer    sched={self}  rsrcs={rsrcs} />
      </div>
    );
  },
//      <TimespansContainer sched={this}  rsrcs={this.state.rsrcs} />

  componentDidMount: function() {
    this.loadScheduleFromServer();
    // setInterval(this.loadScheduleFromServer, this.props.pollInterval);
  }
});


  //     // .done( function(data) { // fka success
  //     //   this.resource_tags.forEach( function(tag) {

  //     //     // ResourceRow
  //     //     var controller = this.state.use_block_list_Ctls[tag]
  //     //     if ( ! controller ) {
  //     //       console.log( "No resource tag " + key + " in " +
  //     //         this.state.use_block_list_Ctls );
  //     //       return
  //     //     }
           
  //     //     // OK, GOT DATA BUT NOT PUT INTO RESOURCE-ROWS YET
  //     //     // var blocks     = $scope.json_data[key]
  //     //     // controller.add_blocks( controller, blocks )
  //     //   })
  //     // }); // Errors handled above in get_data


  // handleCommentSubmit: function(comment) {
  //   var comments = this.state.data;
  //   comments.push(comment);
  //   this.setState({data: comments}, function() {
  //     // `setState` accepts a callback. To avoid (improbable) race condition,
  //     // `we send the ajax request right after we optimistically set the new
  //     // `state.
  //     $.ajax({
  //       url: this.props.url,
  //       dataType: 'json',
  //       type: 'POST',
  //       data: { comment: comment },
  //       success: function(data) {
  //         this.setState({data: data});
  //       }.bind(this),
  //       error: function(xhr, status, err) {
  //         console.error(this.props.url, status, err.toString());
  //       }.bind(this)
  //     });
  //   });
  // },



$(document).on("page:change", function() {
  var $content = $("#content");
  if ($content.length > 0) {
    // pollInterval={2000}
    // For some reason url comes out 'schedule/schedule' or ''. DKW.
    // More idiomatic, perhaps:  window.TopResourceSchedule =
    React.render(
      <ScheduleContainer url="schedule" />,
      document.getElementById('content') // $content.get( 0 )
    );
  }
})

