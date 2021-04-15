import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'
import RunningLogo from '../Running_Logo/RunningLogo'

// TESTS 
import { testLoginTime } from '../ResponseTests/LoginTest'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'

// ADDITIONAL FUNCTIONS
import { getAccessDataInTimeframe, formatTableData, getDataInTimeframe } from '../getPastData'
import { mainChartDetails, loginChartDetails, setChartDetails } from './setCharts'
import { setDataFunc, setTime } from './setData'


const AutomatedHistory = () => {
  // PAST DATA
  const [dropDownValue, setDropDownValue] = useState("last24Hours")
  const [chartTitle, setChartTitle] = useState("Last 24 Hours")
  const [timeFrame, setTimeFrame] = useState("24 HOURS")

  // STOP & START TESTING
  const [getIsTesting, setIsTesting] = useState(false)

  // INTERVAL
  const [intervalTime, setIntervalTime] = useState(10000)
  const [intervalValue, setIntervalValue] = useState("ten-secs")

  // CHART STATES
  const [mainChartState, setMainChartState] = useState({});
  const [loginChartState, setLoginChartState] = useState({});
  const [groupsChartState, setGroupsChartState] = useState({});
  const [usersChartState, setUsersChartState] = useState({});
  const [templatesChartState, setTemplatesChartState] = useState({});
  const [inspectionsChartState, setInspectionsChartState] = useState({});

  // DATA
  const [acceptData, setAcceptData] = useState([{}]);
  const [rejectData, setRejectData] = useState([{}]);
  const [groupsData, setGroupsData] = useState([{}]);
  const [usersData, setUsersData] = useState([{}]);
  const [templatesData, setTemplatesData] = useState([{}]);
  const [inspectionsData, setInspectionsData] = useState([{}]);

  const handleChangeDropDown = (e) => {
    let choice = e.target.value;
    setDropDownValue(choice);
    switch (choice) {
        case "last24Hours":
            setChartTitle("Last 24 Hours")
            setTimeFrame("24 HOURS")
            break;
        case "last7Days":
            setChartTitle("Last 7 Days")
            setTimeFrame("7 DAYS")
            break;
        case "last2Weeks":
            setChartTitle("Last 2 Weeks")
            setTimeFrame("2 WEEKS")
            break;
        case "lastMonth": 
            setChartTitle("Last Month")
            setTimeFrame("1 MONTH")
            break;
    }
  }

  const handleChangeIntervalTime = (e) => {
    let time = e.target.value;
    let msTime = setTime(time);
    setIntervalTime(msTime);
    setIntervalValue(time);
  }

  let allPastData = {};
  // GET STORED DATA WITHIN TIMEFRAME & FORMAT FOR USE IN CHARTS
  const getStoredData = async () => {
    let promises = [
      await getAccessDataInTimeframe('access_token', timeFrame, true).then(formatTableData),
      await getAccessDataInTimeframe('access_token', timeFrame, false).then(formatTableData),
      await getDataInTimeframe('groups', timeFrame).then(formatTableData),
      await getDataInTimeframe('users', timeFrame).then(formatTableData),
      await getDataInTimeframe('templates', timeFrame).then(formatTableData),
      await getDataInTimeframe('inspections', timeFrame).then(formatTableData),
    ]
    return Promise.all(promises).then(values => {
      allPastData["access_token_true"] = values[0];
      allPastData["access_token_false"] = values[1];
      allPastData['groups'] = values[2];
      allPastData['users'] = values[3];
      allPastData['templates'] = values[4];
      allPastData['inspections'] = values[5];
      return allPastData
    }).then(allPastData => {
      // format data for charts
      for (let i = 0; i <= allPastData['access_token_true']['time'].length; i++) {
        setAcceptData(setDataFunc(allPastData, acceptData, 'access_token_true', i))
      }
      for (let i = 0; i <= allPastData['access_token_false']['time'].length; i++) {
        setRejectData(setDataFunc(allPastData, rejectData, 'access_token_false', i))
      }
      for (let i = 0; i <= allPastData['groups']['time'].length; i++) {
        setGroupsData(setDataFunc(allPastData, groupsData, 'groups', i))
      }
      for (let i = 0; i <= allPastData['users']['time'].length; i++) {
        setUsersData(setDataFunc(allPastData, usersData, 'users', i))
      }
      for (let i = 0; i <= allPastData['templates']['time'].length; i++) {
        setTemplatesData(setDataFunc(allPastData, templatesData, 'templates', i))
      }
      for (let i = 0; i <= allPastData['inspections']['time'].length; i++) {
        setInspectionsData(setDataFunc(allPastData, inspectionsData, 'inspections', i))
      }
    })
  }

  // PUT DATA INTO CHARTS
  const updateChart = async () => {
    setMainChartState(mainChartDetails(acceptData, rejectData, groupsData, usersData, templatesData, inspectionsData))
    setLoginChartState(loginChartDetails(acceptData, rejectData))
    setGroupsChartState(setChartDetails('Groups', groupsData, 'rgb(255, 195, 0)'))
    setUsersChartState(setChartDetails('Users', usersData, 'rgb(46, 230, 204)'))
    setTemplatesChartState(setChartDetails('Templates', templatesData, 'rgb(232, 51, 255)'))
    setInspectionsChartState(setChartDetails('Inspections', inspectionsData, 'rgb(0, 0, 255)'))
  }

  // START TESTS :: GET PAST DATA -> UPDATE CHARTS W/DATA -> DEFINE INTERVAL FUNC -> SET INTERVAL TO RUN INTERVAL FUNC @ TIME -> INITIAL RUN OF INTERVAL FUNC
  const startTests = async () => {
    setIsTesting(true)
    await getStoredData()
    updateChart()

    const intervalFunc = async () => {
      // run tests
      await testLoginTime()
      await GetGroups()
      await GetUser()
      await SearchTemplates()
      await SearchInspections()
    
      // get data
      await getStoredData()
      updateChart()
    }
    let intervalId = setInterval(intervalFunc, intervalTime)
    intervalFunc()
    sessionStorage.setItem('intervalID', intervalId)
  }

  const stopTests = () => {
    setIsTesting(false)
    clearInterval(sessionStorage.getItem('intervalID'))
  }
  

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Automated Response Time Tests</h1>

        {!getIsTesting && (
          <div>
            <label for="dropDown" ></label>
            <select class="btn btn-secondary dropdown-toggle" style={{marginRight: "10px"}} value={dropDownValue} onChange={handleChangeDropDown}>
              <option value="last24Hours">Last 24 Hours</option>
              <option value="last7Days">Last 7 Days</option>
              <option value="last2Weeks">Last 2 Weeks</option>
            </select>
            <label for="interval" style={{margin: "0px 5px 15px 0px"}}>Interval Time:</label>
            <select class="btn btn-secondary dropdown-toggle" style={{marginRight: "10px"}} value={intervalValue} onChange={handleChangeIntervalTime}>
              <option class="dropdown-item" value="hour">1 hour</option>
              <option class="dropdown-item" value="thirty-min">30 minutes</option>
              <option class="dropdown-item" value="fifteen-min">15 minutes</option>
              <option class="dropdown-item" value="five-min">5 minutes</option>
              <option class="dropdown-item" value="one-min">1 minute</option>
              <option class="dropdown-item" value="thirty-secs">30 seconds</option>
              <option class="dropdown-item" value="ten-secs">10 seconds</option>
            </select>
            <button onClick={startTests} class="btn btn-primary">Start Tests</button>
          </div>
        )}
        {getIsTesting && (<RunningLogo />)}
        {getIsTesting && (<button onClick={stopTests} class="btn btn-danger">Stop Tests</button>)}
      </div>

      <div style={{margin: "20px 50px"}}>
        <h2 style={{textAlign: 'center'}}>{chartTitle}</h2>

        <MainChart data={mainChartState}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap' }}>
        <div>
          <SideChart data={loginChartState} title={'Login Time'} />
        </div>
        <div>
          <SideChart data={groupsChartState} title={'Group Time'} />
        </div>
        <div>
          <SideChart data={usersChartState} title={'User Time'} />
        </div>
        <div>
          <SideChart data={templatesChartState} title={'Template Time'} />
        </div>
        <div>
          <SideChart data={inspectionsChartState} title={'Inspection Time'} />
        </div>

      </div>
    </div>
  )
}

export default AutomatedHistory