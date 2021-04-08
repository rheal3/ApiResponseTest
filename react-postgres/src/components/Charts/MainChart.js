import React from 'react'
import {Line} from 'react-chartjs-2'

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
  
                }
              }],
  
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Date Time",
                  fontSize: 16
                }
              }]
            }
          }}
          height={'400%'}
        />
    )
}
export default MainChart


