
Template.stream.rendered = function () {
  $('.collapsible').collapsible()
  Meteor.call('getStreamStatus', function(err, res) {
    Session.set('streaming', res === 'true')
  })
}

Template.stream.helpers({
  listSteams: function () {
    return [1, 2, 3]
  },
  isStreaming: function () {
    return Session.get('streaming')
  }
})

Template.stream.events({
  "click li": function(event, template){
    //  console.log('hello');
     Meteor.setTimeout(function(){
       $('ul.tabs').tabs();
       $('select').material_select();
       Materialize.updateTextFields();


     }, 100);
  },
  "change #stream-start-switch": function(event, template){
    var toggled = $(event.currentTarget).prop('checked')
    // console.log('switch toggled', $(event.currentTarget).prop('checked'));
    if (toggled){
      Meteor.call('startStream', function(err, res){
         Meteor.call('getStreamStatus', function(err, res) {
           Session.set('streaming', res === 'true')
         })
       })
    } else {
       Meteor.call('stopStream', function(err, res){
         Meteor.call('getStreamStatus', function(err, res) {
           Session.set('streaming', res === 'true')
         })
       })
    }

  },
  // "click #stopStream": function(event, template){
  //    Meteor.call('stopStream')
  // },
  // "click #startAggregate": function(event, template){
  //    Meteor.call('startAggregate')
  // },
  // "click #stopAggregate": function(event, template){
  //    Meteor.call('stopAggregate')
  // }
});
