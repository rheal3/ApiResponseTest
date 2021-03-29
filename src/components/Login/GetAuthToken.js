
export default function GetAuthToken(username, password, url) {
    return (
    fetch(url, {
        body: `grant_type=password&username=${username}&password=${password}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
      .then(response => {
            return response.json()
      })
      .then(data => data.access_token)
      .catch(error => console.log(error))
    )
}
