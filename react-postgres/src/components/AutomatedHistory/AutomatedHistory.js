import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

import { getLoginDataPoint } from '../dataStorage'
import { getAccessDataInTimeframe, formatTableData } from '../getPastData'
import { testLoginTime } from '../ResponseTests/LoginTest'


const AutomatedHistory = () => {
  const [mainChartState, setMainChartState] = useState({});
  const [acceptData, setAcceptData] = useState([{}]);
  const [loginChart, setLoginChart] = useState();

  let allPastData = {};
  const getStoredData = async () => {
    return Promise.all([
      await getAccessDataInTimeframe('access_token', '24 HOURS', true).then(formatTableData)
    ]).then(values => {
      allPastData["access_token_true"] = values[0];
      return allPastData
    }).then(allPastData => {
      for (let i = 0; i <= allPastData['access_token_true']['time'].length; i++) {
          setAcceptData(acceptData => {
            let old = acceptData;
            old.push({
              x: allPastData['access_token_true']['date_time'][i],
              y: allPastData['access_token_true']['time'][i]
            })
            return old
          })
      }
    })
  }
// get last entered datapoint, decided not to use instead update chart each time
  // const getNewData = async () => {
  //   return (
  //     Promise.all([
  //       await getLoginDataPoint(true),
  //     ]).then(values => {
  //       setAcceptData(acceptData => {
  //         let old = acceptData;
  //         old.push({
  //           x: values[0]['date_time'],
  //           y: values[0]['time']
  //         })
  //         return old
  //       })
  //     })
  //   )
  // }

  const updateChart = async () => {
    setMainChartState({
      datasets: [{
        label: 'Login Accept',
        data: acceptData,
        fill: false,
        borderColor: [
          'rgb(0, 200, 0)'
        ],
        tension: 0.1}]
      })

    setLoginChart({
      datasets: [{
        label: 'Login Accept',
        data: acceptData,
        fill: false,
        borderColor: [
          'rgb(0, 200, 0)'
        ],
        tension: 0.1}]
      })
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
        <SideChart data={loginChart} title={'Login Time'} />
      </div>
    </div>
  )
}

export default AutomatedHistory