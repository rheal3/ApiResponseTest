import React, { useState } from 'react'
import getAccessToken from './GetAccessToken'

/*
    Handles the login input fields and functionality
*/
const Login = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [apiToken, setApiToken] = useState(sessionStorage.apiToken);

    const handleUsernameInputChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const sendLoginRequest = async () => {
        setApiToken(await getAccessToken(usernameValue, passwordValue))
        setUsernameValue('')
        setPasswordValue('')
    }

    const handleLogout = () => {
        delete sessionStorage.apiToken
        delete sessionStorage.username
        delete sessionStorage.password
        setApiToken(sessionStorage.getItem('apiToken'))
    }

    return (
        <div>
            <div style={{textAlign: "right"}}>
                {!apiToken && (<input type="text" value={usernameValue} onChange={handleUsernameInputChange} placeholder="email" />)}
                {!apiToken && (<input type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="password" />)}
                {!apiToken && (<button onClick={sendLoginRequest}>LOGIN</button>)}
                {apiToken && (<button onClick={handleLogout}>LOGOUT</button>)}
            </div>
        </div>
    )
}

export default Login