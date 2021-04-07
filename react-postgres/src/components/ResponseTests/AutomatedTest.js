import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { getLoginDataPoint, getLastDataPointTime, getDateTime } from '../dataStorage'
import { testLoginTime } from './LoginTest'
import {Line} from 'react-chartjs-2'

const AutomatedTest = () => {
    // const [loginResolveTime, setloginResolveTime] = useState('')
    // const [loginRejectTime, setloginRejectTime] = useState('')
    // const [getGroupsTime, setGroupsTime] = useState('')
    // const [getUserTime, setUserTime] = useState('')
    const [getTemplateTime, setTemplateTime] = useState('')
    // const [getInspectionTime, setInspectionTime] = useState('')
    const [getIsTesting, setIsTesting] = useState(false)
    const [getMainChartState, setMainChartState] = useState({})
    const [getLoginChartState, setLoginChartState] = useState({})
    const [getGroupChartState, setGroupChartState] = useState({})
    const [getUserChartState, setUserChartState] = useState({})
    const [getTemplateChartState, setTemplateChartState] = useState({})
    const [getInspectionChartState, setInspectionChartState] = useState({})
    
    const [intervalTime, setIntervalTime] = useState(10000)
    const [intervalValue, setIntervalValue] = useState("ten-secs")
    let labels = []
    let acceptData = []
    let rejectData = []
    let groupData = []
    let userData = []
    let templateData = []
    let inspectionData = []

    const handleChangeIntervalTime = (e) => {
      let time = e.target.value;
      let msTime = 0
      switch (time) {
        case "hour":
          msTime = 3600000;
          break;
        case "thirty-min":
          msTime = 1800000;
          break;
        case "fifteen-min":
          msTime = 900000;
          break;
        case "five-min":
          msTime = 300000;
          break;
        case "one-min":
          msTime = 60000;
          break;
        case "thirty-secs":
          msTime = 30000;
          break;
        case "ten-secs":
          msTime = 10000;
          break;
      }
      setIntervalTime(msTime);
      setIntervalValue(time);
    }


    const startTests = () => {
        if (sessionStorage['apiToken']) {
            setIsTesting(true)

            const intervalFunc = async () => {
              if(!sessionStorage.getItem('intervalID')) {
                sessionStorage.setItem('intervalID', intervalID)
              }
              // console.log("In interval with ID: " + intervalID)
              
              await runTests()
              // setloginResolveTime(await getLoginDataPoint(true));
              // setloginRejectTime(await getLoginDataPoint(false));
              // setGroupsTime(await getLastDataPointTime('groups'));
              // setUserTime(await getLastDataPointTime('users'));
              setTemplateTime(await getLastDataPointTime('templates'));
              // setInspectionTime(await getLastDataPointTime('inspections'));

            updateChart()
            console.log(intervalID)

            }
            let intervalID = setInterval(intervalFunc, intervalTime)
            intervalFunc();

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

        setMainChartState({})

        setMainChartState({
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

        setLoginChartState({})
        setLoginChartState({
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
            label: 'Login Reject',
            data: rejectData,
            fill: false,
            borderColor: [
              'rgb(255, 0, 0)'
            ],
            tension: 0.1

          }]
        })

        setGroupChartState({})
        setGroupChartState({
          labels: labels,
          datasets: [{
            label: 'Group',
            data: groupData,
            fill: false,
            borderColor: [
              'rgb(128, 128, 0)'
            ],
            tension: 0.1
          }]
            
        })

        setUserChartState({})
        setUserChartState({
          labels: labels,
          datasets: [{
            label: 'User',
            data: userData,
            fill: false,
            borderColor: [
              'rgb(128, 128, 128)'
            ],
            tension: 0.1
          }]
            
        })

        setTemplateChartState({})
        setTemplateChartState({
          labels: labels,
          datasets: [{
            label: 'Template',
            data: templateData,
            fill: false,
            borderColor: [
            'rgb(128, 0, 128)'
          ],
          tension: 0.1
          }]
          
        })

        setInspectionChartState({})
        setInspectionChartState({
          labels: labels,
          datasets: [{
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
            {!getIsTesting && (
              <div>
                <label for="interval">Interval Time:</label>
                <select value={intervalValue} onChange={handleChangeIntervalTime}>
                    <option value="hour">1 hour</option>
                    <option value="thirty-min">30 minutes</option>
                    <option value="fifteen-min">15 minutes</option>
                    <option value="five-min">5 minutes</option>
                    <option value="one-min">1 minute</option>
                    <option value="thirty-secs">30 seconds</option>
                    <option value="ten-secs">10 seconds</option>
                </select>
                <button onClick={startTests}>Start Tests</button>
              </div>
            )}

            {getIsTesting && (<button onClick={stopTests}>Stop Tests</button>)}
            <br/>
            {/* <p>Login Accept: {loginResolveTime}</p>
            <p>Login Reject: {loginRejectTime}</p>
            <p>Get Group: {getGroupsTime}</p>
            <p>Get a Group User: {getUserTime}</p>
            <p>Search Template: {getTemplateTime}</p>
            <p>Search Inspection: {getInspectionTime}</p> */}

            <div>
              {/* Main Chart */}
            <Line
                data = {getMainChartState}
                options = {{
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
                height = {'400%'}
                />
            </div>


            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap'} }>
                  <div >

                    {/* Login Chart */}
                  <Line
                data = {getLoginChartState}
                options = {{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: "Login Times"
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

                height = {'300%'}
                />
                  </div>
                  <div >

                    {/* group Chart */}
                  <Line
                data = {getGroupChartState}
                options = {{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: "Group Time"
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
                height = {'300%'}
                />
                  </div>
                  <div >
                    {/* User Chart */}
                  <Line
                data = {getUserChartState}
                options = {{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: "User Time"
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
                height = {'300%'}
                />
                  </div>
                  <div >

                    {/* Template Chart */}
                  <Line
                data = {getTemplateChartState}
                options = {{
                    maintainAspectRatio: false,

                    title: {
                      display: true,
                      text: "Template Time"
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
                height = {'300%'}
                />
                  </div>
                  <div >

                    {/* Inspection Chart */}
                  <Line
                data = {getInspectionChartState}
                options = {{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: "Inspection Time"
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
                height = {'300%'}
                />
                  </div>
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