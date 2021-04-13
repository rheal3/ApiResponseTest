import React, { useState } from 'react'
import './tooltip.css'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { getLoginDataPoint, getLastDataPointTime, getDateTime } from '../dataStorage'
import { testLoginTime } from './LoginTest'
import RunningLogo from '../Running_Logo/RunningLogo'
import { getAvgTime, getBestTime, getWorstTime } from './bestWorstAverage';

import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'


/*
  handles all the automation of the tests and sends the data to the charts
*/
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

  let idCount = []; // a container for datapoint ID's for the current session

  let acceptData = []
  let rejectData = []
  let groupData = []
  let userData = []
  let templateData = []
  let inspectionData = []


  //handles the drop down menu
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

  // starts the automation of the tests at an interval set by the dropdown menu
  const startTests = () => {
    if (sessionStorage['apiToken']) {
      setIsTesting(true)

      const intervalFunc = async () => {
        // if data for charts goes missing, grab from session storage (happened on stop tests then restart)
        if (acceptData !== JSON.parse(sessionStorage.getItem('acceptData')) && sessionStorage['acceptData']) {
          acceptData = JSON.parse(sessionStorage.getItem('acceptData'))
          rejectData = JSON.parse(sessionStorage.getItem('rejectData'))
          groupData = JSON.parse(sessionStorage.getItem('groupData'))
          userData = JSON.parse(sessionStorage.getItem('userData'))
          templateData = JSON.parse(sessionStorage.getItem('templateData'))
          inspectionData = JSON.parse(sessionStorage.getItem('inspectionData'))
        }
        sessionStorage.setItem('intervalID', intervalID)
        await runTests()
        await getData()
        // console.log(labels)
        updateChart()
        setBestTimesData(await getBestTime(idCount[0]));
        setWorstTimesData(await getWorstTime(idCount[0]));
        setAvgTimesData(await getAvgTime(idCount[0]));
      }

      let intervalID = setInterval(intervalFunc, intervalTime)
      intervalFunc(); // Initial running of tests once start button is pressed

    } else {
      alert("You need to login first")
    }
  }

  // Stops the automation of tests using clearInterval(intervalID)
  const stopTests = () => {
    setIsTesting(false)
    clearInterval(sessionStorage.getItem('intervalID'))
  }

  // gets all the latest data from the database and appends it to the lists for the charts
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

        /*
        format for charts {
          x: date time the data was collected
          y: response time in ms
        }
        */
        acceptData.push({
          x: values[0]['date_time'],
          y: values[0]['time']
        })

        rejectData.push({
          x: values[1]['date_time'],
          y: values[1]['time']
        })

        groupData.push({
          x: values[2]['date_time'],
          y: values[2]['time']
        })

        userData.push({
          x: values[3]['date_time'],
          y: values[3]['time']
        })
        templateData.push({
          x: values[4]['date_time'],
          y: values[4]['time']
        })

        inspectionData.push({
          x: values[5]['date_time'],
          y: values[5]['time']
        })


        // create backup of chart data
        sessionStorage.setItem('acceptData', JSON.stringify(acceptData))
        sessionStorage.setItem('rejectData', JSON.stringify(rejectData))
        sessionStorage.setItem('groupData', JSON.stringify(groupData))
        sessionStorage.setItem('userData', JSON.stringify(userData))
        sessionStorage.setItem('templateData', JSON.stringify(templateData))
        sessionStorage.setItem('inspectionData', JSON.stringify(inspectionData))

        // adds the ID of the latest datapoints 
        idCount.push({
          'access_token': values[0]['id'],
          'groups': values[2]['id'],
          'users': values[3]['id'],
          'templates': values[4]['id'],
          'inspections': values[5]['id']
        })

        if (acceptData.length > 2) {
          setChartHasData(true)
        }
      })
    )
  }

  //handles the formatting of the data to send to the charts
  const updateChart = () => {

    // Main Chart
    setMainChartState({
      // Login Accept
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

    // Login Chart
    setLoginChartState({
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

    // Group Chart
    setGroupChartState({
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

    // User Chart
    setUserChartState({
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

    // Template Chart
    setTemplateChartState({
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

    // Inspection Chart
    setInspectionChartState({
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

  // Handles clearing the charts
  const clearClicked = () => {
    setChartHasData(false)
    acceptData = []
    rejectData = []
    groupData = []
    userData = []
    templateData = []
    inspectionData = []

    updateChart()

    sessionStorage.setItem('acceptData', JSON.stringify(acceptData))
    sessionStorage.setItem('rejectData', JSON.stringify(rejectData))
    sessionStorage.setItem('groupData', JSON.stringify(groupData))
    sessionStorage.setItem('userData', JSON.stringify(userData))
    sessionStorage.setItem('templateData', JSON.stringify(templateData))
    sessionStorage.setItem('inspectionData', JSON.stringify(inspectionData))
  }


  return (
    <div>
      {/* Title Buttons Logo */}
      <div style={{ textAlign: "center" }}>
        <h1>Automated Response Time Tests</h1>

        <div style={{ textAlign: "end" }}>
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
        {getIsTesting && (<RunningLogo />)}
        {getIsTesting && (<button onClick={stopTests}>Stop Tests</button>)}
      </div>

      {/* Charts and Key data Details */}
      <div>
        <MainChart data={getMainChartState} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap' }}>
        <div style={{ textAlign: 'center' }} >

          {/* Login Chart */}
          <SideChart data={getLoginChartState} title={'Login Time'} />
          {chartHasData && (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <div>
              <p className="tooltip">Login Accept<span className="tooltiptext">/auth</span></p>
              <div>Average: {avgTimesData['access_token_true'][0]['avg']} ms</div>
              <div>Worst: {worstTimesData['access_token_true'][0]['time']} ms @ {worstTimesData['access_token_true'][0]['date_time']} ms</div>
              <div>Best: {bestTimesData['access_token_true'][0]['time']} ms @ {bestTimesData['access_token_true'][0]['date_time']}</div>
            </div>

            <br />

            <div>
              <p className="tooltip">Login Reject<span className="tooltiptext">/auth</span></p>
              <div>Average: {avgTimesData['access_token_false'][0]['avg']} ms</div>
              <div>Worst: {worstTimesData['access_token_false'][0]['time']} ms @ {worstTimesData['access_token_false'][0]['date_time']}</div>
              <div>Best: {bestTimesData['access_token_false'][0]['time']} ms @ {bestTimesData['access_token_false'][0]['date_time']}</div>
            </div>
          </div>)}
        </div>

        <div style={{ textAlign: 'center' }} >

          {/* group Chart */}
          <SideChart data={getGroupChartState} title={'Group Time'} />
          {chartHasData && (<div>
            <p className="tooltip">Group<span className="tooltiptext">/share/connections</span></p>
            <div>Average: {avgTimesData['groups'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['groups'][0]['time']} ms @ {worstTimesData['groups'][0]['date_time']}</div>
            <div>Best: {bestTimesData['groups'][0]['time']} ms @ {bestTimesData['groups'][0]['date_time']} </div>
          </div>)}

        </div>
        <div style={{ textAlign: 'center' }} >

          {/* User Chart */}
          <SideChart data={getUserChartState} title={'User Time'} />
          {chartHasData && (<div>
            <p className="tooltip">User<span className="tooltiptext">/groups/&lt;group_id&gt;users</span></p>
            <div>Average: {avgTimesData['users'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['users'][0]['time']} ms @ {worstTimesData['users'][0]['date_time']}</div>
            <div>Best: {bestTimesData['users'][0]['time']} ms @ {bestTimesData['users'][0]['date_time']}</div>
          </div>)}
        </div>

        <div style={{ textAlign: 'center' }} >
          
          {/* Template Chart */}
          <SideChart data={getTemplateChartState} title={'Template Time'} />
          {chartHasData && (<div>
            <p className="tooltip">Template<span className="tooltiptext">/templates/search?field=template_id&amp;field=modified_at</span></p>
            <div>Average: {avgTimesData['templates'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['templates'][0]['time']} ms @ {worstTimesData['templates'][0]['date_time']}</div>
            <div>Best: {bestTimesData['templates'][0]['time']} ms @ {bestTimesData['templates'][0]['date_time']}</div>
          </div>)}
        </div>

        <div style={{ textAlign: 'center' }} >

          {/* Inspection Chart */}
          <SideChart data={getInspectionChartState} title={'Inspection Time'} />
          {chartHasData && (<div>
            <p className="tooltip">Inspection<span className="tooltiptext">/audits/search?field=audit_id&amp;field=modified_at</span></p>
            <div>Average: {avgTimesData['inspections'][0]['avg']} ms</div>
            <div>Worst: {worstTimesData['inspections'][0]['time']} ms @ {worstTimesData['inspections'][0]['date_time']}</div>
            <div>Best: {bestTimesData['inspections'][0]['time']} ms @ {bestTimesData['inspections'][0]['date_time']}</div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

// runs each of the API calls
async function runTests() {
  await testLoginTime()
  await GetGroups()
  await GetUser()
  await SearchTemplates()
  await SearchInspections()
  // getDataInTimeframe("users", '1 DAY')
}

// Used to fix a reload bug
window.onbeforeunload = () => {
  sessionStorage.removeItem('intervalID')
  sessionStorage.removeItem('acceptData')
}

export default AutomatedTest