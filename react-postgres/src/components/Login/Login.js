import React, { useState } from 'react'
import getAccessToken from './GetAccessToken'

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

    return (
        <div>
            <div style={{textAlign: "right"}}>
                {!apiToken && (<input type="text" value={usernameValue} onChange={handleUsernameInputChange} placeholder="email" />)}
                {!apiToken && (<input type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="password" />)}
                {!apiToken && (<button onClick={ async () => {
                    setApiToken(await getAccessToken(usernameValue, passwordValue))
                    setUsernameValue('')
                    setPasswordValue('')
                }}>LOGIN</button>)}
                {apiToken && (<button onClick={() => {
                    delete sessionStorage.apiToken
                    delete sessionStorage.username
                    delete sessionStorage.password
                    setApiToken(sessionStorage.getItem('apiToken'))
                }}>LOGOUT</button>)}
            </div>
            <br/>
            
        </div>
    )
}

export default Login