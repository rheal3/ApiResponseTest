import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

import { getAccessDataInTimeframe, formatTableData, getDataInTimeframe } from '../getPastData'
import { testLoginTime } from '../ResponseTests/LoginTest'

import { mainChartDetails, loginChartDetails, setChartDetails } from './setCharts'
import { setDataFunc } from './setData'

const AutomatedHistory = () => {
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

  let allPastData = {};
  const getStoredData = async () => {
    return Promise.all([
      await getAccessDataInTimeframe('access_token', '24 HOURS', true).then(formatTableData),
      await getAccessDataInTimeframe('access_token', '24 HOURS', false).then(formatTableData),
      await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
      await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
      await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
      await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData)
    ]).then(values => {
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
      <button onClick={start}>Begin</button>
      <div>
        <MainChart data={mainChartState}/>
      </div>
      <div>
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