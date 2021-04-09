import { storeData, dateTime } from '../dataStorage'

/*
    sends a request to the API for all the audits and returns the first 1000 audit ID's and the modified_at fields
    and times the response which gets stored to the Database
*/
function SearchInspections() {
    let apiToken = sessionStorage.getItem('apiToken')
    let url = sessionStorage.getItem('BASE_URL') + '/audits/search?field=audit_id&field=modified_at'

    const startTime = window.performance.now()
    let time;

    return( fetch(url, {
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
                tableName: 'inspections',
                responseOk: true,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: data.count,
                dateTime: dateTime(),
            })
        } else {
            storeData({
                tableName: 'inspections',
                responseOk: false,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: 0,
                dateTime: dateTime(),
            })
        }
    }).catch(error => console.log(error))

    )
}

export default SearchInspections