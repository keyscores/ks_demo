
// import { $ } from 'jquery'
// var Gridster = require('gridster')
var stubs = require('meteor-node-stubs')

Template.dashboard.rendered = function(){
  var gridInstance = $(".gridster ul").gridster({
      widget_margins: [10, 10],
      widget_base_dimensions: [240, 140],
      draggable: {
        stop: function(event, ui){
          console.log('gridInstance', gridInstance)
        }
      },
      resize: {
        enabled: true
      }
  })

  // gridInstance.enable_resize()

  // console.log('gridInstance', gridInstance)
  // gridInstance.gridster()
}

Template.dashboard.helpers({
  grid: function(){
    return [1,2,3]
  }
});
