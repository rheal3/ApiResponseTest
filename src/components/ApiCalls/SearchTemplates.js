import React, {useState} from 'react'
import { storeData, dateTime } from '../dataStorage'

const SearchTemplates = () => {
    const [getTemplateTime, setTemplateTime] = useState('')

    const getTemplates = () => {
        if (!sessionStorage['apiToken']) {
            return alert("LOGIN FOR COOL FEATURES!")
        } else {
            let apiToken = sessionStorage.getItem('apiToken')
            let url = sessionStorage.getItem('BASE_URL') + '/templates/search?field=template_id&field=modified_at'
    
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
                    setTemplateTime(time + " milliseconds")
                    return response.json()
                } else {
                    return false
                }
            }).then(data => {
                if (data !== false) {
                    storeData({
                        process: 'searchTemplates',
                        responseOk: true,
                        time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                        numItemsRetrieved: data.count,
                        dateTime: dateTime(),
                    })
                } else {
                    storeData({
                        process: 'searchTemplates',
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
            <h3>Search Templates response time test</h3>
            <button onClick={getTemplates}>Search Templates</button>
            </div>
            <p>Search Templates Time: {getTemplateTime}</p>
        </div>
    )
}

export default SearchTemplates