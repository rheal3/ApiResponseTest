import { storeData, dateTime } from '../dataStorage'

function getAccessToken(username, password) {
    let url = sessionStorage.getItem('BASE_URL') + "/auth";

    let startTime = window.performance.now()
    let time;

    return (fetch(url, {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => {
        let endTime = window.performance.now()
        time = endTime - startTime
        console.log("Get API Token Response Execution Time: " + time + " milliseconds")

        if (response.ok) {
            sessionStorage.setItem('accept_time', time)
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('password', password)
            return response.json()
        } else {
            sessionStorage.setItem('reject_time', time)
            // alert('Invalid Login Details')
            return false
        }
    }).then(data => {
        if (data !== false) {
            
            const apiToken = data.access_token;
            sessionStorage.setItem('apiToken', apiToken)
            storeData({
                process: 'getAccessToken',
                responseStatus: 'ok',
                time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                numItemsRetrieved: 2,
                dateTime: dateTime(),
            })
            // alert('Token Acquired.')
        } else {
            storeData({
                process: 'getAccessToken',
                responseStatus: 'error',
                time: `${Math.round((time + Number.EPSILON) * 100) / 100} ms`,
                numItemsRetrieved: 0,
                dateTime: dateTime(),
            })
        }
    }).catch(error => console.log(error))
    )
}

export default getAccessToken