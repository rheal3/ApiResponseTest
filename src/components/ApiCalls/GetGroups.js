import React, {useState} from 'react'
import { storeData, dateTime } from '../dataStorage'



const GetGroups = () => {
    const [getGroupTime, setGroupTime] = useState('')

   const testGroupsTime= () => {

        if (!sessionStorage['apiToken']) {
            return alert("LOGIN FOR COOL FEATURES!")
        } else {
            let apiToken = sessionStorage.getItem('apiToken')
            let url = sessionStorage.getItem('BASE_URL') + '/share/connections'
        
            const startTime = window.performance.now()
            let time;
        
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiToken
                }
            }).then(response => {
                let endTime = window.performance.now()
                time = endTime - startTime
                
                if (response.ok) {
                    return response.json()
                } else {
                    return false
                }
            }).then(data => {
                if (data !== false) {
                    sessionStorage.setItem('groupObj', JSON.stringify(data))
                    storeData({
                        process: 'getGroups',
                        responseOk: true,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: data.groups.length,
                        dateTime: dateTime(),
                    })

                    setGroupTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
                } else {
                    storeData({
                        process: 'getGroups',
                        responseOk: false,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: 0,
                        dateTime: dateTime(),
                    })
                }
            }).catch(error => console.log(error))
            
        }
    }

    return (
        <div>
            <div>
            <h3>Get Groups response time test</h3>
            <button onClick={testGroupsTime}>Test Get Group Times</button>
            </div>
            <p>Get Groups Time: {getGroupTime}</p>
        </div>
        
    )
}

export default GetGroups