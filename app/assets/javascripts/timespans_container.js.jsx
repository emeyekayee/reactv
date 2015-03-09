/** @jsx React.DOM */


var TimespansContainer = React.createClass({
  // Properties: this.props.rsrcs,    // [] at first creation.
  //             this.props.sched     // 


  render: function() {
    var timespanNodes = this.renderTimespanNodes();

    return (
      <div id="timespans-container">
        <div id="scrolling-container">
          <div id="positioned-container">
            <div id="current-time-cursor"> </div>

            {timespanNodes}

          </div>
        </div>
      </div>
    );
  },


  renderTimespanNodes: function() {
    var sched = this.props.sched;

    return this.props.rsrcs.map( function(rsrc, index) {
      var classes = 'rsrcRow ' + TimePix.row_kind(rsrc.tag) + 'row';

      return (
        <div className={classes} key={index}>
          <Timespan   sched={sched}  rsrc_tag={rsrc.tag} />
        </div>
      );
    });
  },

});
