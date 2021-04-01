import { storeData, dateTime } from '../dataStorage'

function GetGroups() {
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
        } else {
            storeData({
                process: 'getGroups',
                responseOk: false,
                time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                numItemsRetrieved: 0,
                dateTime: dateTime(),
            })
        }
        return time;
    }).catch(error => console.log(error))
    let saveData = JSON.parse(localStorage.getItem('saveData'))
    return saveData[saveData.length -1].time

}

export default GetGroups