import React from 'react';
import { Bar } from 'react-chartjs-2';

class index extends React.Component {

    componentDidMount(){
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: '#F7FAFF',
            borderColor: "#2D6DCD",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },gridLines : {
                    display : false
                }
            }],
            xAxes: [{
                gridLines : {
                    display : false
                },
                ticks: {
                    display: false
                }
            }]
        },
        legend : {
            display : false
        }
    }
})
    }


    render(){
  return (
      <div style={{ height : '300px' }}>
    <canvas id="myChart" width="400" ></canvas>
    </div>
  )
}
}
export default index;