import React from 'react'
// import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import { getDataInTimeframe, formatTableData } from '../getPastData'

const Results = () => {
    let labels = ['start'];
    let groupData = [0];
    let accessTokenData = [0];
    let userData = [0];
    let inspectionsData = [0];
    let templatesData = [0];
    const allData = {};

    const getLast24Hours = async () => {
        Promise.all([
            await getDataInTimeframe('access_token', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData),
          ]).then((values) => {
            allData['access_token'] = values[0];
            allData['groups'] = values[1];
            allData['users'] = values[2];
            allData['templates'] = values[3];
            allData['inspections'] = values[4];

            labels.push(allData['groups']['date_time'])
            groupData.push(allData['groups']['time'])
            userData.push(allData['users']['time'])
            accessTokenData.push(allData['accessToken']['time'])
            inspectionsData.push(allData['inspections']['time'])
            templatesData.push(allData['templates']['time'])
        })
        // return allData;
    }

    getLast24Hours()

    let allDataChartState = {
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
      }
    return (
        <div>
            <MainChart data={allDataChartState} title={'All Data'}/>
        </div>
    )
}

export default Results