import React from 'react'
import { storeData, dateTime } from '../dataStorage'

export function getGroups() {
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
                alert(`Get My Groups Returned ${data.groups.length} groups in ${time} milliseconds`)
                sessionStorage.setItem('groupObj', JSON.stringify(data))
                storeData({
                    process: 'getGroups',
                    responseOk: true,
                    time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                    numItemsRetrieved: data.groups.length,
                    dateTime: dateTime(),
                })
            } else {
                storeData({
                    process: 'getGroups',
                    responseOk: false,
                    time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                    numItemsRetrieved: 0,
                    dateTime: dateTime(),
                })
            }
            return data
        }).catch(error => console.log(error))
    }
}

const GetGroups = () => {
    return (
        <div>
            <button onClick={getGroups}>Get Group Times</button>
        </div>
    )
}

export default GetGroups