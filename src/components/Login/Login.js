import React, {useState} from 'react'
import GetAuthToken from './GetAuthToken'

const Login = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    let apiToken
    const BASE_URL = "https://sandpit-api.safetyculture.io"

    const handleUsernameChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const handleClick = () => {
        setUsernameValue("")
        setPasswordValue("")
        let url = BASE_URL + "/auth"
        apiToken = GetAuthToken(usernameValue, passwordValue, url)
        console.log(apiToken)
        // console.log(apiToken)
        // fetch(url, {
        //     body: `grant_type=password&username=${usernameValue}&password=${passwordValue}`,
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     method: "POST"
        //   })
        //   .then(response => {
        //         return response.json()
        //   })
        //   .then(data => {
        //       apiToken = data.access_token
        //       console.log(apiToken)
        //   })
        //   .catch(error => console.log(error))
    }

    return(
        <div>
            <label >Enter username: </label>
            <input type="text" value={usernameValue} onChange={handleUsernameChange}/> 
            <br/>
            <label >Enter password: </label>
            <input type="password" value={passwordValue} onChange={handlePasswordChange}/>
            <br/>
            <button onClick={handleClick}>Get Token</button>
        </div>
    )

}

export default Login