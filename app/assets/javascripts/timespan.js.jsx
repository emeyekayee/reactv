/** @jsx React.DOM */


var Timespan = React.createClass({
  // Properties: this.props.rsrc_tag  //
  //             this.props.sched     //

  getInitialState: function() {
    return { process_fn: this.get_block_process_function(),
             use_blocks: []
    };
  },


  kind: function() {
    return this.props.rsrc_tag.split('_')[0]
  },

  get_block_process_function: function() {
    var class_name = this.kind() + 'UseBlock'
    var constructr = window[class_name]
    return constructr.process.bind(constructr)
  },


  new_blocks: function() {
    return this.props.sched.json_data[this.props.rsrc_tag]
  },


  // Get any new json_data for this timespan.  Rather than mutating
  // the state.use_blocks, make a copy, add the new custom-processed
  // json_data and do a setState with the updated copy.
  add_blocks: function () {
    var blocks     = this.new_blocks();
    var old_blocks = this.state.use_blocks.slice(0)

    var how        = 'push'
    // This should be transfered/held in top level sched.state.meta
    // per ajax request and accessed from there (not TimePix).
    if (TimePix.inc == 'lo') {
      how = 'unshift'
      blocks.reverse()
    }

    while (blocks) {
      old_blocks[how]( this.state.process_fn(blocks.shift().blk) )
    }

    this.setState( {use_blocks: old_blocks} );
  },


  // After creation we first get rendered with 0 use_blocks.  Here we
  // register with the top level schedule.  It calls us back with
  // add_blocks() to add new use_blocks to our state.
  componentDidMount: function() {
    this.props.sched.register_timespan( this, this.props.rsrc_tag );
  },


  render: function() {
    var useBlockNodes = this.renderUseBlockNodes();
    return (
      <div className="timespan">
          {useBlockNodes}
      </div>
    );
  },


  renderUseBlockNodes: function() {
    return this.state.use_blocks.map( function(block, index) {
      var classes = block.css_classes + ' blockdiv';
      var style   = TimePix.style_geo( block );

      return (
        <div className={classes} key={index}
             style={style} >
          <div className="text_locator">
            <a href="">{block.label}</a>
          </div>
        </div>
      );
    });
  }

});
