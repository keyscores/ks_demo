Meteor.startup(function(){
  Lookup.remove()
  Lookup.insert({ shares: 13, ticker: 'AAPL' })
});
