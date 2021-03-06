const Chart = require('chart.js');
const Packery = require('packery')
const Draggabilly = require('draggabilly')

Template.dashboard.rendered = function () {
  var ready = false
  var pckry = new Packery( '.grid', {
    itemSelector: '.grid-item',
    columnWidth: 100
  });

  pckry.getItemElements().forEach( function( itemElem ) {
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
  });

  var lineData = {
    labels: [],
    datasets: [
        {
            label: "Stock Price",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#4dd0e1",
            borderColor: "#4dd0e1",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        }
    ]
};


  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      responsive:true,
      maintainAspectRatio: false,
      type: 'line',
      data: lineData,
      options: {
          scales: {
              yAxes: [{
                // scaleOverride: true,
                // scaleSteps: 5,
                // scaleStepWidth: 20,

                  ticks: {
                      // beginAtZero:true,
                      // min: 130,
                      beginAtZero: false,
                      suggestedMin: 143.7,
                      suggestedMax: 144.3,

                  }
              }],
              xAxes: [{
                type: 'time',
                unit: 'day',
                unitStepSize: 1,

                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5,
                   beginAtZero: false,

                  maxRotation: 0 // angle in degrees
                },
                time: {
                  displayFormats: {
                    'hour': 'HH:mm'
                  }
                }
              }]
            }
          }
  });

  // setInterval(function () {
  //     // var latestlabel = chartlabel[6];
  //     // myChart.addData([40, 60], "test");
  //
  //     myChart.data.datasets[0].data.push(100)
  //     myChart.data.labels.push('months')
  //     myChart.update()
  // }, 1000);


  let query = Pond.find({});
  let handle = query.observeChanges({
    changed: function (id, fields) {
      // changed stuff
    },
    added: function (id, fields) {
      if (ready) {
        console.log('observeChanges id', id );
        console.log('observeChanges fields', fields );

        myChart.data.datasets[0].data.push(fields.price)
        myChart.data.labels.push(fields.time)
        myChart.update()
      }


     }
  });

  // this.autorun(function(){
  //   var data = Pond.find().fetch()
  //   myChart.data.datasets[0].data.push(100)
  //   myChart.data.labels.push('months')
  //   myChart.update()
  // });
  ready = true
}

Template.dashboard.helpers({
  grid: function () {
    return [1, 2, 3]
  }
})

Template.dashboardEditor.events({
  "click #startStream": function(event, template){
     Meteor.call('startStream')
  },
  "click #stopStream": function(event, template){
     Meteor.call('stopStream')
  },
  "click #startAggregate": function(event, template){
     Meteor.call('startAggregate')
  },
  "click #stopAggregate": function(event, template){
     Meteor.call('stopAggregate')
  }
});


Template.start.events({
  "click #refresh": function(event, template){
     Meteor.call("fixtureReset")
    Materialize.toast('Refreshing Calcs', 4000)
  }
});
