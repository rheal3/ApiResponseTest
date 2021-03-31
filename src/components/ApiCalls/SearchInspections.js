import React, {useState} from 'react'
import { storeData, dateTime } from '../dataStorage'

const SearchInspections = () => {
    const [getInspectionTime, setInspectionTime] = useState('')

    const getInspections = () => {
        if (!sessionStorage['apiToken']) {
            return alert("LOGIN FOR COOL FEATURES!")
        } else {
            let apiToken = sessionStorage.getItem('apiToken')
            let url = sessionStorage.getItem('BASE_URL') + '/audits/search?field=audit_id&field=modified_at'
    
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
                    setInspectionTime(time + " milliseconds")
                    return response.json()
                } else {
                    return false
                }
            }).then(data => {
                if (data !== false) {
                    storeData({
                        process: 'searchInspections',
                        responseOk: true,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: data.count,
                        dateTime: dateTime(),
                    })
                } else {
                    storeData({
                        process: 'searchInspections',
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


    return (
        <div>
            <div>
            <h3>Search Inspections response time test</h3>
            <button onClick={getInspections}>Search Inspections</button>
            </div>
            <p>Search Inspections Time: {getInspectionTime}</p>
            
        </div>
    )
}

export default SearchInspections