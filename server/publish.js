Meteor.publish("pond", function(argument){
  var now = new Date()
  now.setDate(now.getDate()-1 )

  let query = Pond.find({time: {$gt: now }});

  return query
});
