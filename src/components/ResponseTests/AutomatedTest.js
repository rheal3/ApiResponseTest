import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { testLoginTime } from './LoginTest'
import {Line} from 'react-chartjs-2'

const AutomatedTest = () => {
    const [loginResolveTime, setloginResolveTime] = useState('')
    const [loginRejectTime, setloginRejectTime] = useState('')
    const [getGroupsTime, setGroupsTime] = useState('')
    const [getUserTime, setUserTime] = useState('')
    const [getTemplateTime, setTemplateTime] = useState('')
    const [getInspectionTime, setInspectionTime] = useState('')
    const [getIsTesting, setIsTesting] = useState(false)
    const [getChartState, setChartState] = useState({})
    let labels = []
    let acceptData = []
    let rejectData = []
    let groupData = []
    let userData = []
    let templateData = []
    let inspectionData = []


    const startTests = () => {
        if (sessionStorage['apiToken']) {
            setIsTesting(true)
            let intervalID = setInterval(async () => {
                if(!sessionStorage.getItem('intervalID')) {
                    sessionStorage.setItem('intervalID', intervalID)
                }
                // console.log("In interval with ID: " + intervalID)
                
                await runTests()
                setloginResolveTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 6]['time'] + ' ms')
                setloginRejectTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 5]['time'] + ' ms')
                setGroupsTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 4]['time'] + ' ms')
                setUserTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['time'] + ' ms')
                setTemplateTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'] + ' ms')
                setInspectionTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'] + ' ms')

                updateChart()
            }, 10000)
        } else {
            alert("You need to login first")
        }
    }

    const stopTests = () => {
        setIsTesting(false)
        // console.log("I'm supposed to stop the timer with ID: " + sessionStorage.getItem('intervalID') + " !!")
        clearInterval(sessionStorage.getItem('intervalID'))
        sessionStorage.removeItem('intervalID')
    }

    const updateChart = () => {
        labels.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['dateTime'])

        acceptData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 6]['time'])
        rejectData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 5]['time'])
        groupData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 4]['time'])
        userData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['time'])
        templateData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
        inspectionData.push(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])



        // labels = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 29]['dateTime'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 22]['dateTime'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 15]['dateTime'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 8]['dateTime'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['dateTime']

        // ]
        // acceptData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 6]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 12]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 18]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 24]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 30]['time'],
        // ]

        // rejectData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 5]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 11]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 17]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 23]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 29]['time'],
        // ]

        // groupData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 4]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 10]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 16]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 22]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 28]['time'],
        // ]

        // userData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 9]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 15]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 21]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 27]['time'],
        // ]

        // templateData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 8]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 14]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 20]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 26]['time'],
        // ]

        // inspectionData = [
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 7]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 13]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 19]['time'],
        //     JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 25]['time'],
        // ]

        setChartState({})

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
            <h3>Automated Testing Test</h3>
            {!getIsTesting && (<button onClick={startTests}>Start Tests</button>)}
            <br/>
            {getIsTesting && (<button onClick={stopTests}>Stop Tests</button>)}
            <br/>
            <p>Login Accept: {loginResolveTime}</p>
            <p>Login Reject: {loginRejectTime}</p>
            <p>Get Group: {getGroupsTime}</p>
            <p>Get a Group User: {getUserTime}</p>
            <p>Search Template: {getTemplateTime}</p>
            <p>Search Inspection: {getInspectionTime}</p>

            <div>
            {/* <button onClick={updateChart}>Update Chart</button> */}
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
                height = {'400%'}
                width = {'30%'} 
                />
            </div>

        </div>

        
    )
}

async function runTests() {
    await testLoginTime()
    await GetGroups()
    await GetUser()
    await SearchTemplates()
    await SearchInspections()
}

export default AutomatedTest