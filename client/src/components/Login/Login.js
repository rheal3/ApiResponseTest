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
        <div class="input-group mb-3 d-flex justify-content-end">
            {!apiToken && (<input class="input-group-text" style={{margin: "15px 0px"}} type="text" value={usernameValue} onChange={handleUsernameInputChange} placeholder="email" />)}
            {!apiToken && (<input class="input-group-text" style={{margin: "15px 0px"}} type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="password" />)}
            {!apiToken && (<button class="btn btn-primary" style={{margin: "15px 15px 15px 0px"}} onClick={sendLoginRequest}>LOGIN</button>)}
            {apiToken && (<button class="btn btn-primary" style={{margin: "15px 15px 15px 0px"}} onClick={handleLogout}>LOGOUT</button>)}
        </div>
    )
}

export default Login