import { useState } from 'react'
import MainChart from '../Charts/MainChart'
import { getAllDataFromTable, formatTableData } from '../getPastData'


const DisplayPastData = () => {
    let groupData = [0, ];
    let groupLabels = ['start'];
    const allData = {};

    const getAllData = async () => {

        Promise.all([
            await getAllDataFromTable('access_token').then(formatTableData),
            await getAllDataFromTable('groups').then(formatTableData),
            await getAllDataFromTable('users').then(formatTableData),
            await getAllDataFromTable('templates').then(formatTableData),
            await getAllDataFromTable('inspections').then(formatTableData),
          ]).then((values) => {
            allData['access_token'] = values[0];
            allData['groups'] = values[1];
            allData['users'] = values[2];
            allData['templates'] = values[3];
            allData['inspections'] = values[4];

            groupData.push(allData['groups']['time'])
            groupLabels.push(allData['groups']['date_time'])
        })
        // return allData;
    }

    getAllData()

    let allDataChartState = {
        labels: groupLabels,
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

export default DisplayPastData;