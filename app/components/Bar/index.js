import React from 'react';
import { Bar } from 'react-chartjs-2';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day:'',
            tokens: '',
            graphData: this.props.graphData,
        };

      }


    componentDidMount=()=>{
        console.log("sheeshssa: ", this.state.graphData, "pooop", this.props.typeChart);
        if (this.props.typeChart == 'daily'){
            var ctx = document.getElementById('myChart');
            new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.state.graphData.date,
            datasets: [{
                label: '# of tokens earned',
                data: this.state.graphData.tokensEarned,
                backgroundColor: '#F7FAFF',
                borderColor: "#2D6DCD",
                borderWidth: 1,
                spanGaps:true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: true
                    },gridLines : {
                        display : false
                    }
                }],
                xAxes: [{
                    type: 'time',
                    display:true,
                    time: {
                        min:this.state.graphData.userCreatedAt,
                        max:Date.now(),
                        displayFormats:{
                            day:'DD/MM/YY',
                        },
                        unit:'day',
                        round:'day',
                    },
                    distribution:'linear',
                    gridLines : {
                        display : true
                    },
                    ticks: {
                        display: true
                    }
                }]
            },
            legend : {
                display : true
            }
        }
    })

        } else if(this.props.typeChart == 'monthly'){
            console.log("currrrrrr: ", this.state.graphData.tokensEarnedMonthly," ",this.state.graphData.monthDate)
            var ctx = document.getElementById('myChart');
            new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.state.graphData.monthDate,
            datasets: [{
                label: '# of tokens earned',
                data: this.state.graphData.tokensEarnedMonthly,
                backgroundColor: '#F7FAFF',
                borderColor: "#2D6DCD",
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: true
                    },gridLines : {
                        display : false
                    }
                }],
                xAxes: [{
                    display:true,
                    time: {
                        min:this.state.graphData.userCreatedAt,
                        max:Date.now(),
                        displayFormats:{
                            month:'MMM YYYY',
                        },
                        unit:'month',
                        round:'month',
                    },
                    distribution:'linear',
                    gridLines : {
                        display : true
                    },
                    ticks: {
                        display: true
                    }
                }]
            },
            legend : {
                display : true
            }
        }
    })
        }else if (this.props.typeChart == 'weekly'){
            var ctx = document.getElementById('myChart');
        new Chart(ctx, {
    type: 'line',
    data: {
        labels: this.state.graphData.week,
        datasets: [{
            label: '# of tokens earned',
            data: this.state.graphData.tokensEarnedWeekly,
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
                    display: true,
                    callback: function(value, index, values) {
                        return 'Week' + value;
                    }
                }
            }]
        },
        legend : {
            display : false
        }
    }
})


        }


    }
//  scales: {
//             xAxes:[{
//                 display:true,
//                 time: {
//                     min:Date.parse('2018/02/01 00:00:00'),
//                     max:Date.parse('2018/03/01 00:00:00'),
//                     displayFormats:{
//                         day:'ddd MM/DD',
//                     },
//                     unit:'day',
//                     round:'day',
//                 },
//                 distribution:'linear',
//                 scaleLabel: {
//                     display:true,
//                     labelString:'Date'
//                 },
//                 bounds:'data',
//                 ticks: {
//                     source:'data',
//                 },
//             }],
//             yAxes:[{
//                 display:true,
//                 scaleLabel:'Rating'
//             }]
//         },

    render(){
        
  return (
      <div style={{ height : '300px' }}>
    <canvas id="myChart" width="400" height="120px" ></canvas>

    </div>
  )
}
}
export default index;