

Template.aggregate.rendered = function () {
  $('.collapsible').collapsible()
  Meteor.call("getAggregateStatus", function(err, res){
    Session.set("aggregating", res === 'true')
  })
  // Session.set('varName', 'hello moto');
}

Template.aggregate.helpers({
  listPipeline: function () {
    return ['Lookup Shares Sum', 'Latest Price', 'Multiply' ]
  },
  listPipelineSteps: function () {
    return [1, 2, 3]
  },
  "editorOptions": function() {
    return {
      lineNumbers: true,
      mode: "javascript"
    }
  },
  isAggregating: function (){
    return Session.get('aggregating')
  }
})

Template.aggregate.events({

  "click li": function(event, template){
    //  console.log('hello');
     Meteor.setTimeout(function(){
       $('ul.tabs').tabs();
       $('select').material_select();
       Materialize.updateTextFields();


     }, 100);
  },
  "change .aggregate-start-switch": function(event, template){
    var toggled = $(event.currentTarget).prop('checked')
    // console.log('switch toggled', $(event.currentTarget).prop('checked'));
    if (toggled){
      Meteor.call('startAggregate', function(err, res){
         Meteor.call('getStreamStatus', function(err, res) {
           Session.set('aggregating', res === 'true')
         })
       })
    } else {
       Meteor.call('stopAggregate', function(err, res){
         Meteor.call('getStreamStatus', function(err, res) {
           Session.set('aggregating', res === 'true')
         })
       })
    }

  },
});
