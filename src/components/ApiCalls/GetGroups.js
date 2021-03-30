import React from 'react'

export function getGroups() {
    if (!sessionStorage['apiToken']) {
        return alert("LOGIN FOR COOL FEATURES!")
    } else {
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
    
            return response.json()
        }).then(data => {
            alert(`Get My Groups Returned ${data.groups.length} groups in ${time} milliseconds`)
            sessionStorage.setItem('groupObj', JSON.stringify(data))
            return data
        }).catch(error => console.log(error))
    
    }
}

const GetGroups = () => {
    return (
        <div>
            <button onClick={getGroups}>Get Group Times</button>
        </div>


    )
}

export default GetGroups