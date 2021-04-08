import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { getLoginDataPoint, getLastDataPointTime, getDateTime } from '../dataStorage'
import { testLoginTime } from './LoginTest'
import {Line} from 'react-chartjs-2'
import RunningLogo from '../Running_Logo/RunningLogo'
import { getAvgTime, getBestTime, getWorstTime } from './cases';

const AutomatedTest = () => {
  const [getIsTesting, setIsTesting] = useState(false)
  const [getMainChartState, setMainChartState] = useState({})
  const [getLoginChartState, setLoginChartState] = useState({})
  const [getGroupChartState, setGroupChartState] = useState({})
  const [getUserChartState, setUserChartState] = useState({})
  const [getTemplateChartState, setTemplateChartState] = useState({})
  const [getInspectionChartState, setInspectionChartState] = useState({})
  const [chartHasData, setChartHasData] = useState(false)

  const [bestTimesData, setBestTimesData] = useState({})
  const [worstTimesData, setWorstTimesData] = useState({})
  const [avgTimesData, setAvgTimesData] = useState({})



  const [intervalTime, setIntervalTime] = useState(10000)
  const [intervalValue, setIntervalValue] = useState("ten-secs")
  let idCount = [];

  let labels = ['start']
  let acceptData = [0]
  let rejectData = [0]
  let groupData = [0]
  let userData = [0]
  let templateData = [0]
  let inspectionData = [0]

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
              await runTests()
              await getData()
              updateChart()
              setBestTimesData(await getBestTime(idCount[0]));
              setWorstTimesData(await getWorstTime(idCount[0]));
              setAvgTimesData(await getAvgTime(idCount[0]));
              }
            
            let intervalID = setInterval(intervalFunc, intervalTime) 
            intervalFunc();
            

        } else {
            alert("You need to login first")
        }
  }

  const stopTests = () => {
    setIsTesting(false)
    clearInterval(sessionStorage.getItem('intervalID'))
    sessionStorage.removeItem('intervalID')
  }

  const getData = async () => {
    return (
      Promise.all([
        await getLoginDataPoint(true),
        await getLoginDataPoint(false),
        await getLastDataPointTime('groups'),
        await getLastDataPointTime('users'),
        await getLastDataPointTime('templates'),
        await getLastDataPointTime('inspections'),
        await getDateTime('inspections')
      ]).then((values) => {
        acceptData.push(values[0]['time'])
        rejectData.push(values[1]['time'])
        groupData.push(values[2]['time'])
        userData.push(values[3]['time'])
        templateData.push(values[4]['time'])
        inspectionData.push(values[5]['time'])
        labels.push(values[6])
        idCount.push({
          'access_token': values[0]['id'], 
          'groups': values[2]['id'], 
          'users': values[3]['id'], 
          'templates': values[4]['id'], 
          'inspections': values[5]['id']
        })

        if (labels.length > 2) {
          setChartHasData(true)
        }

      })
    )
  }

  const updateChart = () => {
    setMainChartState({
      // Login Accept
      labels: labels,
      datasets: [{
        label: 'Login Accept',
        data: acceptData,
        fill: false,
        borderColor: [
          'rgb(0, 200, 0)'
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
          'rgb(64, 64, 64)'
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

    setLoginChartState({
      labels: labels,
      datasets: [{
        label: 'Login Accept',
        data: acceptData,
        fill: false,
        borderColor: [
          'rgb(0, 200, 0)'
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

    setUserChartState({
      labels: labels,
      datasets: [{
        label: 'User',
        data: userData,
        fill: false,
        borderColor: [
          'rgb(64, 64, 64)'
        ],
        tension: 0.1
      }]
    })

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

  const clearClicked = () => {
    setChartHasData(false)
    labels = []
    acceptData = []
    rejectData = []
    groupData = []
    userData = []
    templateData = []
    inspectionData = []

    updateChart()

    labels = ['start']
    acceptData = [0]
    rejectData = [0]
    groupData = [0]
    userData = [0]
    templateData = [0]
    inspectionData = [0]    
  }


  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Automated Response Time Tests</h1>

        <div style={{textAlign: "end"}}>
          {chartHasData && !getIsTesting && (<button onClick={clearClicked}>Clear Charts</button>)}
        </div>
        
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
        {getIsTesting && (<RunningLogo/>)}
        {getIsTesting && (<button onClick={stopTests}>Stop Tests</button>)}
      </div>
     

      <div>
        {/* Main Chart */}
        <Line
          redraw={true}
          data={getMainChartState}
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
      </div>


      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap' }}>
        <div style={{textAlign: 'center'}} >

          {/* Login Chart */}
          <Line
            redraw={true}
            data={getLoginChartState}
            options={{
              legend: {
                display: false
              },
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

            height={'300%'}
          />
          {chartHasData && (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <div>
              <p>Login</p>
              <div>Average: {avgTimesData['access_token'][0]['avg']} ms</div>
              <div>Worst: {worstTimesData['access_token'][0]['time']} ms @ {worstTimesData['access_token'][0]['date_time']} ms</div>
              <div>Best: {bestTimesData['access_token'][0]['time']} ms @ {bestTimesData['access_token'][0]['date_time']}</div>
            </div>
            <br/>
            {/* <div>
              <p>Login Reject</p>
              <div>Average: {getLoginRejectAverage} ms</div>
              <div>Worst: {getLoginRejectWorst} ms</div>
              <div>Best: {getLoginRejectBest} ms</div>
            </div> */}
          </div>)}
          

          
        </div>
        <div style={{textAlign: 'center'}} >

          {/* group Chart */}
          <Line
            redraw={true}
            data={getGroupChartState}
            options={{
              legend: {
                display: false
              },
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
            height={'300%'}
          />
          {chartHasData && (<div>
            <p>Group</p>
            <div>Average: {avgTimesData['groups'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['groups'][0]['time']} ms @ {worstTimesData['groups'][0]['date_time']}</div>
            <div>Best: {bestTimesData['groups'][0]['time']} ms @ {bestTimesData['groups'][0]['date_time']} </div>
          </div>)}
          
        </div>
        <div style={{textAlign: 'center'}} >
          {/* User Chart */}
          <Line
            redraw={true}
            data={getUserChartState}
            options={{
              legend: {
                display: false
              },
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
            height={'300%'}
          />

          {chartHasData && (<div>
            <p>User</p>
            <div>Average: {avgTimesData['users'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['users'][0]['time']} ms @ {worstTimesData['users'][0]['date_time']}</div>
            <div>Best: {bestTimesData['users'][0]['time']} ms @ {bestTimesData['users'][0]['date_time']}</div>
          </div>)}
          
        </div>
        <div style={{textAlign: 'center'}} >

          {/* Template Chart */}
          <Line
            redraw={true}
            data={getTemplateChartState}
            options={{
              legend: {
                display: false
              },
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
            height={'300%'}
          />

          {chartHasData && (<div>
            <p>Template</p>
            <div>Average: {avgTimesData['templates'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['templates'][0]['time']} ms @ {worstTimesData['templates'][0]['date_time']}</div>
            <div>Best: {bestTimesData['templates'][0]['time']} ms @ {bestTimesData['templates'][0]['date_time']}</div>
          </div>)}
         
        </div>
        <div style={{textAlign: 'center'}} >

          {/* Inspection Chart */}
          <Line
            redraw={true}
            data={getInspectionChartState}
            options={{
              legend: {
                display: false
              },
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
            height={'300%'}
          />

          {chartHasData && (<div>
            <p>Inspection</p>
            <div>Average: {avgTimesData['inspections'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['inspections'][0]['time']} ms @ {worstTimesData['access_token'][0]['date_time']}</div>
            <div>Best: {bestTimesData['inspections'][0]['time']} ms @ {bestTimesData['access_token'][0]['date_time']}</div>
          </div>)}
          
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