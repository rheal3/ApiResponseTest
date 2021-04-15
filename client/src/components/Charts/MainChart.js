import React from 'react'
import {Line} from 'react-chartjs-2'

/*
  returns a blank chart format that is used as the main chart
  Takes in data through props.data
*/
const MainChart = (props) => {

    return(
        <Line
          redraw={true}
          data={props.data}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Response Times"
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Response Time (ms)",
                  fontSize: 16
  
                },
                ticks: {
                  callback: function(value, index, values) {
                    return value + 'ms';
                  }
                }
              }],
  
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Date Time",
                  fontSize: 16
                },
                type: 'time',
                time: {
                 format: "YYYY-MM-DD hh:mm:ss"
                },
                distribution: 'linear'
              }]
            }
          }}
          height={'400%'}
        />
    )
}
export default MainChart


