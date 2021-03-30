let apiToken;

function getAccessToken(username, password) {
    let url = sessionStorage.getItem('BASE_URL') + "/auth";
    fetch(url, {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => {
        return response.json()
    }).then(data => {
        apiToken = data.access_token;
        console.log(apiToken)
        sessionStorage.setItem('apiToken', apiToken)
        alert('Token Acquired.')
    }).catch(error => console.log(error))
}

export default getAccessToken