import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

import { getAccessDataInTimeframe, formatTableData, getDataInTimeframe } from '../getPastData'
import { testLoginTime } from '../ResponseTests/LoginTest'

import { mainChartDetails, loginChartDetails, setChartDetails } from './setCharts'
import { setDataFunc, setPromiseTimeFrame } from './setData'

const AutomatedHistory = () => {

  const [dropDownValue, setDropDownValue] = useState("last24Hours")
  const [chartTitle, setChartTitle] = useState("Last 24 Hours")


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
            break;
        case "last7Days":
            setChartTitle("Last 7 Days")
            break;
        case "last2Weeks":
            setChartTitle("Last 2 Weeks")
            break;
    }
  }

  let allPastData = {};
  let timeFrame = setPromiseTimeFrame(dropDownValue);


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
      // login
      for (let i = 0; i <= allPastData['access_token_true']['time'].length; i++) {
        setAcceptData(setDataFunc(allPastData, acceptData, 'access_token_true', i))
      }
      for (let i = 0; i <= allPastData['access_token_false']['time'].length; i++) {
        setRejectData(setDataFunc(allPastData, rejectData, 'access_token_false', i))
      }
      // groups
      for (let i = 0; i <= allPastData['groups']['time'].length; i++) {
        setGroupsData(setDataFunc(allPastData, groupsData, 'groups', i))
      }
      // users
      for (let i = 0; i <= allPastData['users']['time'].length; i++) {
        setUsersData(setDataFunc(allPastData, usersData, 'users', i))
      }
      // templates
      for (let i = 0; i <= allPastData['templates']['time'].length; i++) {
        setTemplatesData(setDataFunc(allPastData, templatesData, 'templates', i))
      }
      // inspections
      for (let i = 0; i <= allPastData['inspections']['time'].length; i++) {
        setInspectionsData(setDataFunc(allPastData, inspectionsData, 'inspections', i))
      }

    }) 
  }

  const updateChart = async () => {
    setMainChartState(mainChartDetails(acceptData, rejectData, groupsData, usersData, templatesData, inspectionsData))
    setLoginChartState(loginChartDetails(acceptData, rejectData))
    setGroupsChartState(setChartDetails('Groups', groupsData))
    setUsersChartState(setChartDetails('Users', usersData))
    setInspectionsChartState(setChartDetails('Inspections', inspectionsData))
    setTemplatesChartState(setChartDetails('Templates', templatesData))
  }

  const start = async () => {
    await getStoredData()
    updateChart()

    const intervalFunc = async () => {
      await testLoginTime()
      await getStoredData()
      updateChart()
    }
    let intervalId = setInterval(intervalFunc, 10000)
    intervalFunc()
  }
  

  return (
    <div>
      <div>
        <label for="dropDown"></label>
        <select class="btn btn-secondary dropdown-toggle" style={{marginLeft: "15px"}} value={dropDownValue} onChange={handleChangeDropDown}> {/* <-- will change charts*/}
          <option value="last24Hours">Last 24 Hours</option>
          <option value="last7Days">Last 7 Days</option>
          <option value="last2Weeks">Last 2 Weeks</option>
        </select>
      </div>
      <button onClick={start}>Begin</button>
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