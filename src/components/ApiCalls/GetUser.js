import { storeData, dateTime } from '../dataStorage'


function GetUser() {
    let apiToken = sessionStorage.getItem('apiToken')
    let groupObj = JSON.parse(sessionStorage.getItem('groupObj'))
    

    let groupId = groupObj.groups[0].id
    let url = sessionStorage.getItem('BASE_URL')  + `/groups/${groupId}/users`;

    const startTime = window.performance.now()
    let time;

    return ( fetch(url, {
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
    }))
}
export default GetUser