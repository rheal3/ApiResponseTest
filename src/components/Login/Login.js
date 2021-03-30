import React, { useState } from 'react'
import getAccessToken from './GetAccessToken'

const Login = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [goodTime, setGoodTime] = useState('')
    const [badTime, setBadTime] = useState('')

    const handleUsernameInputChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const testResponseTime = () => {
        console.log(sessionStorage.getItem('apiToken'))
        if (sessionStorage.getItem('apiToken') !== null) {
            getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
            getAccessToken("random@safetyculture.io", "invalid")

            
            setBadTime(sessionStorage.getItem('bad_time'))
            setGoodTime(sessionStorage.getItem('good_time'))
            
        }
        else {
            alert("You need to login successfully at least once")
        }
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
            <br/>
            <div>
                <h3>Login response time test</h3>
                <button onClick={testResponseTime}>Test response time</button>
                <p>successful login time: {goodTime}</p>
                <p>unsucessful login time: {badTime}</p>
                {/* <p>{sessionStorage.getItem('apiToken')}</p> */}
            </div>
        </div>
    )
}

export default Login