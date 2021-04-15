import { storeData, dateTime } from '../dataStorage'

/*
    sends a request to the API for groups through /share/connections which retrieves the name and ID of all the groups that the logged in user is apart of
     and times the response which gets stored to the Database
*/
function GetGroups() {
    let apiToken = sessionStorage.getItem('apiToken')
    let url = sessionStorage.getItem('BASE_URL') + '/share/connections'
    
    const startTime = window.performance.now()
    let time;
    
    return (fetch(url, {
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
                    tableName: 'groups',
                    responseOk: true,
                    time: Math.round((time + Number.EPSILON) * 100) / 100,
                    numItemsRetrieved: data.groups.length,
                    dateTime: dateTime(),
                })
            } else {
                storeData({
                    tableName: 'groups',
                    responseOk: false,
                    time: Math.round((time + Number.EPSILON) * 100) / 100,
                    numItemsRetrieved: 0,
                    dateTime: dateTime(),
                })
            }
        }).catch(error => console.log(error))
    )   
}

export default GetGroups