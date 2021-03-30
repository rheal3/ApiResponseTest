import React, { useState } from 'react'
import getAccessToken from './GetAccessToken'

const Login = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const handleUsernameInputChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordValue(event.target.value)
    }

    return (
        <div>
            <input type="text" value={usernameValue} onChange={handleUsernameInputChange} placeholder="email" />
            <input type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="password" />
            <button onClick={() => {
                getAccessToken(usernameValue, passwordValue)
                setUsernameValue('')
                setPasswordValue('')
                }}>Submit</button>
        </div>
    )
}

export default Login