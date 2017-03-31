Meteor.methods({
  reset:function(){
    Lookup.remove({})
    Lookup.insert({ shares: 13, ticker: 'AAPL' })
    Lake.remove({})
    Pond.remove({})
  }
});
