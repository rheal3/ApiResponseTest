function getAccessToken(username, password) {
    let url = sessionStorage.getItem('BASE_URL') + "/auth";

    let startTime = window.performance.now()

    fetch(url, {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => {
        let endTime = window.performance.now()
        let time = endTime - startTime
        console.log("Get API Token Response Execution Time: " + time + " milliseconds")

        if (response.ok) {
            return response.json()
        } else {
            alert('Invalid Login Details')
            return false
        }
    }).then(data => {
        if (data !== false) {
            const apiToken = data.access_token;
            sessionStorage.setItem('apiToken', apiToken)
            alert('Token Acquired.')
        }
    }).catch(error => console.log(error))
}

export default getAccessToken