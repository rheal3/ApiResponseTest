import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { getLoginDataPoint, getLastDataPointTime, getDateTime } from '../dataStorage'
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
                setloginResolveTime(await getLoginDataPoint(true));
                setloginRejectTime(await getLoginDataPoint(false));
                setGroupsTime(await getLastDataPointTime('groups'));
                setUserTime(await getLastDataPointTime('users'));
                setTemplateTime(await getLastDataPointTime('templates'));
                setInspectionTime(await getLastDataPointTime('inspections'));

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

        Promise.all([
          getLoginDataPoint(true), 
          getLoginDataPoint(false), 
          getLastDataPointTime('groups'), 
          getLastDataPointTime('users'), 
          getLastDataPointTime('templates'), 
          getLastDataPointTime('inspections'),
          getDateTime('inspections')
        ]).then((values) => {
          acceptData.push(values[0])
          rejectData.push(values[1])
          groupData.push(values[2])
          userData.push(values[3])
          templateData.push(values[4])
          inspectionData.push(values[5])
          labels.push(values[6])
        })

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