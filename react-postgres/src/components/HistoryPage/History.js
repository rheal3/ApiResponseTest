import { getDataInTimeframe, formatTableData } from '../getPastData'
import { useEffect, useState } from 'react';

import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

const History = () => {
    const [state, setState] = useState({})
    let dropDown = 'last24Hours'
    let promises = [];
    useEffect(async () => {
        if (dropDown === 'last24Hours') {
            promises = [
                await getDataInTimeframe('access_token', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData),
              ]
        } else if (dropDown === 'last7Days') {
            promises = []
        }
        Promise.all(promises).then((values) => {
            past24Hours['access_token'] = values[0];
            past24Hours['groups'] = values[1];
            past24Hours['users'] = values[2];
            past24Hours['templates'] = values[3];
            past24Hours['inspections'] = values[4];
            console.log(past24Hours)
            return past24Hours
          }).then(past24Hours => {

            let groupResponseTimes = past24Hours['groups']['time']
            let groupDateTimes = past24Hours['groups']['date_time']

            let userResponseTimes = past24Hours['users']['time']
            let userDateTimes = past24Hours['users']['date_time']

            let inspectionResponseTimes = past24Hours['inspections']['time']
            let inspectionDateTimes = past24Hours['inspections']['date_time']

            let templateResponseTimes = past24Hours['templates']['time']
            let templateDateTimes = past24Hours['templates']['date_time']

            labels = past24Hours['groups']['date_time']
            // groupData = past24Hours['groups']['time']
            // userData = past24Hours['users']['time']
            // inspectionData = past24Hours['inspections']['time']
            // templateData = past24Hours['templates']['time']

            for (let i=0;i<groupDateTimes.length;i++) {
              groupData.push({
                x: groupDateTimes[i],
                y: groupResponseTimes[i]
              })
            }

            for (let i=0;i<userDateTimes.length;i++) {
              userData.push({
                x: userDateTimes[i],
                y: userResponseTimes[i]
              })
            }

            for (let i=0;i<inspectionDateTimes.length;i++) {
              inspectionData.push({
                x: inspectionDateTimes[i],
                y: inspectionResponseTimes[i]
              })
            }

            for (let i=0;i<templateDateTimes.length;i++) {
              templateData.push({
                x: templateDateTimes[i],
                y: templateResponseTimes[i]
              })
            }

            setState({
                datasets: [{
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
        }).catch(err=>console.error(err.message))}, []
    )

    let labels = [];

    let groupData = [];
    // let accessTokenData = [0];
    let userData = [];
    let inspectionData = [];
    let templateData = [];    
    const past24Hours = {};


// will need to get the required data for each of the charts and setup in format that chart can read from
    return (
        <div>
            <div>
                <label for="dropDown"></label>
                <select value='last24Hours'> {/* dropDownValue onChange={handleChangeDropDown} <-- will change charts*/}
                    <option value="last24Hours">Last 24 Hours</option>
                    <option value="last7Days">Last 7 Days</option>
                </select>
            </div>

            <div>
                <h2 style={{textAlign: 'center'}}>24hr chart spot</h2>

                <div>
                    <MainChart data={state}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap' }}>
                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Login Chart"}/>                      
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Group Chart"} data={groupData}/>                      
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"User Chart"} data={userData}/>                    
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Template Chart"} data={templateData}/>                      
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Inspection Chart"} data={inspectionData}/>                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History