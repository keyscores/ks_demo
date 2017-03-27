var interval

Meteor.methods({
  aggregate:function(){
    var pipeline = [
      {
        $project: {
          name: '$name',
          price: '$price'
        }
      },
      {
        $group: {
          _id: {// _id is a fixed property for mongo aggregate, cannot be changed
            name: '$name'
          },
          price: {
            $sum: '$price'
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          price: '$price'
        }
      },
      {
        $out: 'aggregate'
      }
    ]

    Pond.rawCollection().aggregate(pipeline, function (err, res) {
      console.log('updated Aggregate');
    })
  },
  startAggregate: function () {
    interval = Meteor.setInterval(function () {
      Meteor.call('aggregate')
    }, 5000);
  },
  stopAggregate: function () {
    clearInterval(interval)
  }
});
