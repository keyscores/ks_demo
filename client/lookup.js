Template.lookup.rendered = function () {
  $('.collapsible').collapsible()
  $('ul.tabs').tabs();
  $('select').material_select();
  Materialize.updateTextFields();


  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  }
  )
}

Template.lookup.events({
  "click #lookup_submit": function(event, template){
    event.preventDefault();

    // $( "form" ).serializeArray()
    // event.preventDefault()
    // console.log('event', event);
    //
    // console.log('form', event.target.form);
    //
    // var serialize = $(event.target).serializeArray()
    var shares = $("#shares").val();
    var buy = $("#buy:checked").val();
    var sell = $("#sell:checked").val();


    console.log('shares', shares);
    console.log('buy', buy);
    console.log('sell', sell);

    if(sell){
      shares = shares * -1
    }
    Lookup.insert({shares: Number(shares), ticker: 'AAPL'})
    //  var getEmail = $("#email").val();
    //  var getPassword = $("#password").val();
     //
    // console.log('serialize', $( "#lookup_form" ).serializeArray());

  }
});
