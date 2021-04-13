import { getDataInTimeframe, getAccessDataInTimeframe, formatTableData } from '../getPastData'
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
                await getAccessDataInTimeframe('access_token', '24 HOURS', true).then(formatTableData),
                await getAccessDataInTimeframe('access_token', '24 HOURS', false).then(formatTableData),
                await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData),
              ]
        } else if (dropDown === 'last7Days') {
            promises = []
        }
        Promise.all(promises).then((values) => {
            past24Hours['access_token_true'] = values[0];
            past24Hours['access_token_false'] = values[1];
            past24Hours['groups'] = values[2];
            past24Hours['users'] = values[3];
            past24Hours['templates'] = values[4];
            past24Hours['inspections'] = values[5];
            console.log(past24Hours)
            return past24Hours
          }).then(past24Hours => {
            labels = past24Hours['groups']['date_time']
            groupData = past24Hours['groups']['time']
            userData = past24Hours['users']['time']
            inspectionData = past24Hours['inspections']['time']
            templateData = past24Hours['templates']['time']
            acceptData = past24Hours['access_token_true']['time']
            rejectData = past24Hours['access_token_false']['time']

            setState({
                labels: labels,
                datasets: [
                          // Login Accept
                {
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
        }).catch(err=>console.error(err.message))}, []
    )

    let labels = ['start'];
    let groupData = [0];
    let acceptData = [0];
    let rejectData = [0];    
    let userData = [0];
    let inspectionData = [0];
    let templateData = [0];    
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
                        <SideChart title={"Group Chart"}/>                      
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"User Chart"}/>                    
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Template Chart"}/>                      
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Inspection Chart"}/>                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History