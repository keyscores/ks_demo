
Template.stream.rendered = function () {
  $('.collapsible').collapsible()
}

Template.stream.helpers({
  listSteams: function () {
    return [1, 2, 3]
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
  }
});
