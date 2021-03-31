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

            return response.json()
        }).then(data => {
            alert(`API call to get users from ${groupName} returned ${data.users.length} user(s) in ${time} milliseconds`)
            storeData({
                process: 'getUsers',
                responseStatus: 'ok',
                time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                numItemsRetrieved: data.users.length,
                dateTime: dateTime(),
            })
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