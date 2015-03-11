/** @jsx React.DOM */


var TimespansContainer = React.createClass({
  // Properties: this.props.rsrcs,    // [] at first creation.
  //             this.props.sched     // 


  render: function() {
    return (
      <div id="timespans-container">
        <div id="scrolling-container">
          <div id="positioned-container">
            <div id="current-time-cursor"> </div>

            {this.renderTimespanNodes()}

          </div>
        </div>
      </div>
    );
  },


  renderTimespanNodes: function() {
    return this.props.rsrcs.map( function(rsrc, index) {
      var classes = 'rsrcRow ' + TimePix.row_kind(rsrc.tag) + 'row';

      return (
        <div className={classes} key={index}>
          <Timespan   sched={this.props.sched}  rsrc_tag={rsrc.tag} />
        </div>
      );
    }.bind(this));
  },

});
