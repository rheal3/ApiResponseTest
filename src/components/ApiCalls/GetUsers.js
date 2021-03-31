import React, {useState} from 'react'
import { storeData, dateTime } from '../dataStorage'


const GetUsers = () => {
    const [getGroupUsersTime, setGroupUsersTime] = useState('')

    const getUsersInGroup = () => {
        let apiToken = sessionStorage.getItem('apiToken')

        if (!sessionStorage['groupObj']) {
            alert("You Need to Get Groups First")
        }
        let groupObj = JSON.parse(sessionStorage.getItem('groupObj'))
    
        for (let i = 0; i < groupObj.groups.length; i++) {
            const startTime = window.performance.now()
            let groupId = groupObj.groups[i].id
            let url = sessionStorage.getItem('BASE_URL')  + `/groups/${groupId}/users`;
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
                // alert(`API call to get users from ${groupName} returned ${data.users.length} user(s) in ${time} milliseconds`)
                setGroupUsersTime(time + " milliseconds")
                if (data !== false) {
                    storeData({
                        process: 'getUsers',
                        responseOk: true,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: data.users.length,
                        dateTime: dateTime(),
                    })
                } else {
                    storeData({
                        process: 'getUsers',
                        responseOk: false,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: 0,
                        dateTime: dateTime(),
                    })
                }
                return data
            })
        } 
    }

    return (
        <div>
            <div>
            <h3>Get Users in Groups response time test</h3>
            <button onClick={getUsersInGroup}>Get Users In Group Times</button>
            </div>
            <p>Get Groups Time: {getGroupUsersTime}</p>
        </div>
    )
}


export default GetUsers