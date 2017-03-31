

Template.aggregate.rendered = function () {
  $('.collapsible').collapsible()
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

"editorCode": function() {
  return "Code to show in editor";
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
});
