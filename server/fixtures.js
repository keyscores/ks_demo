Meteor.methods({
  fixtureReset:function(){
    console.log('resetting fixtures');
    Lookup.remove({})
    Lookup.insert({ shares: 13, ticker: 'AAPL' })
    Lake.remove({})
    Pond.remove({})
  }
});
