import React from 'react'
import getGroups from './GetGroups'
import { storeData, dateTime } from '../dataStorage'


function getUsersInGroup() {
    let apiToken = sessionStorage.getItem('apiToken')
    if (!sessionStorage['groupObj']) {
        getGroups()
    }
    let groupObj = JSON.parse(sessionStorage.getItem('groupObj'))

    for (let i = 0; i < groupObj.groups.length; i++) {
        let groupId = groupObj.groups[i].id
        let groupName = groupObj.groups[i].name

        let url = sessionStorage.getItem('BASE_URL')  + `/groups/${groupId}/users`;

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
                alert(`API call to get users from ${groupName} returned ${data.users.length} user(s) in ${time} milliseconds`)

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

const GetUsers = () => {
    return (
        <div>
            <button onClick={getUsersInGroup}>Get Users In Group Times</button>
        </div>


    )
}


export default GetUsers