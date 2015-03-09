/** @jsx React.DOM */


var LabelsContainer = React.createClass({
  // Properties: this.props.rsrcs,    // [] at first creation.
  //             this.props.sched     // 


  render: function() {
    var labelNodes = this.renderLabelNodes();

    return (
      <div id="labels-container">
        <div id="resource-labels">

          {labelNodes}

        </div>
      </div>
    );
  },


  renderLabelNodes: function() {
    return this.props.rsrcs.map( function(rsrc, index) {
      var classes = 'rsrcRow ' + TimePix.row_kind(rsrc.tag) + 'row';
      var isource = '/assets/' + rsrc.label + '.jpg';

      return (
        <div className={classes} key={index}>
          <div className="rsrclabel">
            <img src={isource} title={rsrc.title} />
            <div className="filter"> </div>
            <div className="label-text">{rsrc.label}</div>
          </div>
        </div>
      );
    });
  }
});
