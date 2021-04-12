import { getDataInTimeframe, formatTableData } from '../getPastData'
import { useEffect, useState } from 'react';

import MainChart from '../Charts/MainChart'
import SideChart from '../Charts/sideChart'

const Results = () => {
    const [state, setState] = useState({})
    useEffect(async () => {
        console.log('use effect')
        Promise.all([
            await getDataInTimeframe('access_token', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('groups', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('users', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('templates', '24 HOURS').then(formatTableData),
            await getDataInTimeframe('inspections', '24 HOURS').then(formatTableData),
          ]).then((values) => {
            past24Hours['access_token'] = values[0];
            past24Hours['groups'] = values[1];
            past24Hours['users'] = values[2];
            past24Hours['templates'] = values[3];
            past24Hours['inspections'] = values[4];

            return past24Hours
          }).then(past24Hours => {
            labels = past24Hours['groups']['date_time']
            groupData = past24Hours['groups']['time']
            userData = past24Hours['users']['time']
            inspectionData = past24Hours['inspections']['time']
            templateData = past24Hours['templates']['time']

            setState({
                labels: labels,
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
    console.log('re-rendering')

    let labels = ['start'];
    let groupData = [0];
    // let accessTokenData = [0];
    let userData = [0];
    let inspectionData = [0];
    let templateData = [0];    
    const past24Hours = {};


// will need to get the required data for each of the charts and setup in format that chart can read from
    return (
        <div>
            <div style={{backgroundColor: 'lightsalmon'}}>
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

            <div  style={{backgroundColor: 'lightblue'}}>
                <h2 style={{textAlign: 'center'}}>1 week chart spot</h2>

                <div>
                    <MainChart/>
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

            <div style={{backgroundColor: 'lightgoldenrodyellow'}}>
                <h2 style={{textAlign: 'center'}}>1 fortnight chart spot</h2>

                <div>
                    <MainChart/>
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

            <div style={{backgroundColor: 'lightgreen'}}>
                <h2 style={{textAlign: 'center'}}>1 month chart spot</h2>

                <div>
                    <MainChart/>
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

export default Results