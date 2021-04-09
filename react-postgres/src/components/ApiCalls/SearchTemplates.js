import { storeData, dateTime } from '../dataStorage'

/*
    sends a request to the API for the all the templates and returns the template ID's and modified at fields
    and times the response which gets stored to the Database
*/
function SearchTemplates() {
    let apiToken = sessionStorage.getItem('apiToken')
    let url = sessionStorage.getItem('BASE_URL') + '/templates/search?field=template_id&field=modified_at'

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
                tableName: 'templates',
                responseOk: true,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: data.count,
                dateTime: dateTime(),
            })
        } else {
            storeData({
                tableName: 'templates',
                responseOk: false,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: 0,
                dateTime: dateTime(),
            })
        }
    }).catch(error => console.log(error))
        
    )
}

export default SearchTemplates