import React, {useState} from 'react'
import {Line} from 'react-chartjs-2'

const TestCharts = () => {
    const [getChartState, setChartState] = useState({})

 

    const updateChart = () => {
        let labels = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 29]['dateTime'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 22]['dateTime'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 15]['dateTime'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 8]['dateTime'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['dateTime']

        ]
        let acceptData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 6]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 12]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 18]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 24]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 30]['time'],
        ]

        let rejectData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 5]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 11]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 17]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 23]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 29]['time'],
        ]

        let groupData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 4]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 10]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 16]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 22]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 28]['time'],
        ]

        let userData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 9]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 15]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 21]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 27]['time'],
        ]

        let templateData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 8]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 14]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 20]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 26]['time'],
        ]

        let inspectionData = [
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 7]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 13]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 19]['time'],
            JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 25]['time'],
        ]

        setChartState({
            // Login Accept
            labels: labels,
        datasets: [{
            label: 'Login Accept',
            data: acceptData,
            fill: false,
            borderColor: [
              'rgb(0, 255, 0)'
            ],
            tension: 0.1
          }, {
            // Login Reject
            label: 'Login Reject',
            data: rejectData,
            fill: false,
            borderColor: [
              'rgb(255, 0, 0)'
            ],
            tension: 0.1

          }, {
            // Group 
            label: 'Group',
            data: groupData,
            fill: false,
            borderColor: [
              'rgb(128, 128, 0)'
            ],
            tension: 0.1

          }, {
            // User
            label: 'User',
            data: userData,
            fill: false,
            borderColor: [
              'rgb(128, 128, 128)'
            ],
            tension: 0.1

          }, {
            // Template
            label: 'Template',
            data: templateData,
            fill: false,
              borderColor: [
              'rgb(128, 0, 128)'
            ],
            tension: 0.1

          }, {
            // Inspection
            label: 'Inspection',
            data: inspectionData,
            fill: false,
            borderColor: [
              'rgb(0, 0, 255)'
            ],
            tension: 0.1

          }]
        })
    }

    

    return (
        <div>
            <button onClick={updateChart}>Update Chart</button>
            <Line
                data = {getChartState}
                options = {{
                    maintainAspectRatio: false,
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
                height = {'200%'}
                width = {'30%'} 
            />
        </div>
    )

}


export default TestCharts