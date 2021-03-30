function getAccessToken(username, password) {
    let url = sessionStorage.getItem('BASE_URL') + "/auth";
    let start = window.performance.now()

    fetch(url, {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => {
        let end = window.performance.now()
        let time = end - start
        if (response.ok) {
            sessionStorage.setItem('good_time', time + " milliseconds")
            console.log("successful time: " + time + "  milliseconds")
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('password', password)
            return response.json()
        } else {
            // alert('Invalid Login Details')
            sessionStorage.setItem('bad_time', time  + "milliseconds")
            console.log("Unsuccessful time: " + time + " milliseconds")
            return false
        }
    }).then(data => {
        if (data !== false) {
            const apiToken = data.access_token;
            sessionStorage.setItem('apiToken', apiToken)
            // alert('Token Acquired.')
        }
       
    }).catch(error => console.log(error))

}

export default getAccessToken