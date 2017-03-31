var interval

Meteor.methods({
  aggregate: function () {
    var pipeline = [
      {
        $match: {
          ticker: { $exists: true }
        }
      },
      {
        $project: {
          ticker: '$ticker',
          shares: '$shares'
        }
      },
      {
        $group: {
          _id: {// _id is a fixed property for mongo aggregate, cannot be changed
            ticker: '$ticker'
          },
          shares: {
            $sum: '$shares'
          }
        }
      },
      {
        $project: {
          _id: 0,
          ticker: '$_id.ticker',
          shares: '$shares'
        }
      },
      // {
      //   $out: 'aggregate'
      // }
    ]

    Lookup.rawCollection().aggregate(pipeline, Meteor.bindEnvironment(function (err, res) {
      console.log('updated Aggregate', res);
      var lastTrade = Pond.find({ name: 'AAPL' },{ sort: { time: 1 }, limit: 1 }).fetch()[0]
      console.log('lastTrade', lastTrade);

      var porfolioValue = lastTrade.price * res[0].shares
      console.log('porfolioValue', porfolioValue);
      Aggregate.insert({porfolioValue, time: new Date()})

    }))
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
