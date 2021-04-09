import React from 'react'
import {Line} from 'react-chartjs-2'

/*
  returns a blank chart format that is used for the smaller, individual charts
  Takes in data through props.data
*/
const SideChart = (props) => {

    return (
        <Line
            redraw={true}
            data={props.data}
            options={{
              legend: {
                display: false
              },
              maintainAspectRatio: false,
              title: {
                display: true,
                text: props.title
              },
              scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "Response Time (ms)",
                    fontSize: 14

                  }
                }],

                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "Date Time",
                    fontSize: 14
                  }
                }]
              },
              responsive: false
            }}

            height={'300%'}
          />
    )
}

export default SideChart