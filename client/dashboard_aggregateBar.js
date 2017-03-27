Template.aggregateBar.rendered = function(){
  var ctx = document.getElementById("aggregateBar");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
              label: 'Price',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
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
        myChart.data.datasets[0].data.push(fields.price)
        myChart.data.labels.push(fields.name)
        myChart.update()
      }
  });



}
