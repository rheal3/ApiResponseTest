import { getDataInTimeframe, getAccessDataInTimeframe, formatTableData } from '../getPastData'
import { useEffect, useState } from 'react';

import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

const History = () => {
    const [dropDownValue, setDropDownValue] = useState("last24Hours")
    const [chartTitle, setChartTitle] = useState("Last 24 Hours")
    const [mainChartState, setMainChartState] = useState({})
    const [getLoginChartState, setLoginChartState] = useState({})
    const [getGroupChartState, setGroupChartState] = useState({})
    const [getUserChartState, setUserChartState] = useState({})
    const [getTemplateChartState, setTemplateChartState] = useState({})
    const [getInspectionChartState, setInspectionChartState] = useState({})

    let promises = [];

    // set dropDown value and chose and set title for page
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
            case "lastMonth":
                setChartTitle("Last Month")
                break;
        }
    }

    useEffect(async () => {
      // set promises called based on dropDown value, gets different timeframes for each
        if (dropDownValue === 'last24Hours') {
            promises = [
                await getAccessDataInTimeframe('access_token', '24 HOURS', true).then(formatTableData),
                await getAccessDataInTimeframe('access_token', '24 HOURS', false).then(formatTableData),
                await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
                await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData),
              ]
        } else if (dropDownValue === 'last7Days') {
            promises = [
                await getAccessDataInTimeframe('access_token', '7 DAYS', true).then(formatTableData),
                await getAccessDataInTimeframe('access_token', '7 DAYS', false).then(formatTableData),
                await getDataInTimeframe('groups', '7 DAYS').then(formatTableData),
                await getDataInTimeframe('users', '7 DAYS').then(formatTableData),
                await getDataInTimeframe('templates', '7 DAYS').then(formatTableData),
                await getDataInTimeframe('inspections', '7 DAYS').then(formatTableData),
            ]
        } else if (dropDownValue === 'last2Weeks') {
            promises = [
                await getAccessDataInTimeframe('access_token', '2 WEEKS', true).then(formatTableData),
                await getAccessDataInTimeframe('access_token', '2 WEEKS', false).then(formatTableData),
                await getDataInTimeframe('groups', '2 WEEKS').then(formatTableData),
                await getDataInTimeframe('users', '2 WEEKS').then(formatTableData),
                await getDataInTimeframe('templates', '2 WEEKS').then(formatTableData),
                await getDataInTimeframe('inspections', '2 WEEKS').then(formatTableData),
            ]
        } else if (dropDownValue === 'lastMonth') {
          promises = [
            await getAccessDataInTimeframe('access_token', '1 MONTH', true).then(formatTableData),
            await getAccessDataInTimeframe('access_token', '1 MONTH', false).then(formatTableData),
            await getDataInTimeframe('groups', '1 MONTH').then(formatTableData),
            await getDataInTimeframe('users', '1 MONTH').then(formatTableData),
            await getDataInTimeframe('templates', '1 MONTH').then(formatTableData),
            await getDataInTimeframe('inspections', '1 MONTH').then(formatTableData),
        ]
    }
        // call promises, set values to past24Hours obj 
        Promise.all(promises).then((values) => {
            past24Hours['access_token_true'] = values[0];
            past24Hours['access_token_false'] = values[1];
            past24Hours['groups'] = values[2];
            past24Hours['users'] = values[3];
            past24Hours['templates'] = values[4];
            past24Hours['inspections'] = values[5];
            return past24Hours
          }).then(past24Hours => {
            // set chart data points
            let groupResponseTimes = past24Hours['groups']['time']
            let groupDateTimes = past24Hours['groups']['date_time']

            let userResponseTimes = past24Hours['users']['time']
            let userDateTimes = past24Hours['users']['date_time']

            let inspectionResponseTimes = past24Hours['inspections']['time']
            let inspectionDateTimes = past24Hours['inspections']['date_time']

            let templateResponseTimes = past24Hours['templates']['time']
            let templateDateTimes = past24Hours['templates']['date_time']

            let acceptResponseTimes = past24Hours['access_token_true']['time']
            let acceptDateTimes = past24Hours['access_token_true']['date_time']

            let rejectResponseTimes = past24Hours['access_token_false']['time']
            let rejectDateTimes = past24Hours['access_token_false']['date_time']

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
            
            for (let i=0;i<acceptDateTimes.length;i++) {
                acceptData.push({
                    x: acceptDateTimes[i],
                    y: acceptResponseTimes[i]
                })
            }

            for (let i=0;i<rejectDateTimes.length;i++) {
                rejectData.push({
                    x: rejectDateTimes[i],
                    y: rejectResponseTimes[i]
                })
            }

            setMainChartState({
                datasets: [{
                      // Login Accept
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
        }).catch(err=>console.error(err.message))}, [dropDownValue]
    )

    let acceptData = [];
    let rejectData = [];  
    let groupData = [];
    let userData = [];
    let inspectionData = [];
    let templateData = [];
    const past24Hours = {};

    return (
        <div>
            <div>
                <label for="dropDown"></label>
                <select class="btn btn-secondary dropdown-toggle" style={{marginLeft: "15px"}} value={dropDownValue} onChange={handleChangeDropDown}> {/* <-- will change charts*/}
                    <option value="last24Hours">Last 24 Hours</option>
                    <option value="last7Days">Last 7 Days</option>
                    <option value="last2Weeks">Last 2 Weeks</option>
                    <option value="lastMonth">Last Month</option>
                </select>
            </div>

            <div>
                <h2 style={{textAlign: 'center'}}>{chartTitle}</h2>

                <div style={{margin: "20px 50px"}}>
                    <MainChart data={mainChartState}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'nowrap' }}>
                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Login Chart"} data={getLoginChartState} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Group Chart"} data={getGroupChartState} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"User Chart"} data={getUserChartState} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Template Chart"} data={getTemplateChartState} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <SideChart title={"Inspection Chart"} data={getInspectionChartState} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History