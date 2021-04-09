import { storeData, dateTime } from '../dataStorage'

/*
    Sends a login request to the api and handles the response by retrieving the API token if the login was successful
    Times the response which gets stored to the database with a responseOK depending if the login was successful or rejected
*/
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

        if (response.ok) {
            // Stored purely for the successful login test
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('password', password)

            return response.json()
        } else {
            return false
        }
    }).then(data => {
        if (data !== false) {
            const apiToken = data.access_token;
            sessionStorage.setItem('apiToken', apiToken)

            storeData({
                tableName: 'access_token',
                responseOk: true,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: 1,
                dateTime: dateTime(),
            })
            return apiToken
        } else {
            storeData({
                tableName: 'access_token',
                responseOk: false,
                time: Math.round((time + Number.EPSILON) * 100) / 100,
                numItemsRetrieved: 0,
                dateTime: dateTime(),
            })
        }
    }).catch(error => console.log(error))
    )
}

export default getAccessToken