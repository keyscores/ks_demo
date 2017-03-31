Template.aggregateBar.rendered = function(){
  var ctx = document.getElementById("aggregateBar");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
              label: 'Portfolio Value',
              data: [],
              backgroundColor: '#4dd0e1',
              borderColor: '#4dd0e1',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                type: 'time',
                unit: 'day',
                unitStepSize: 1,
                // scaleSteps : 10,
                // maxTicksLimit: 2,
                barPercentage: 0.2,
                barThickness : 3,

                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 5,
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

  let query = Aggregate.find();
  let handle = query.observeChanges({
    changed: function (id, fields) {
      // changed stuff
    },
    added: function (id, fields) {
        myChart.data.datasets[0].data.push(fields.porfolioValue)
        myChart.data.labels.push(fields.time)
        myChart.update()
      }
  });



}
