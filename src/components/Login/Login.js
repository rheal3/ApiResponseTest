import React, { useState } from 'react'
import getAccessToken from './GetAccessToken'

const Login = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [loginResolveTime, setloginResolveTime] = useState('')
    const [loginRejectTime, setloginRejectTime] = useState('')

    const handleUsernameInputChange = (event) => {
        setUsernameValue(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordValue(event.target.value)
    }

    const testResponseTime = async (e) => {
        console.log(sessionStorage.getItem('apiToken'))

        if (!sessionStorage['apiToken']) {
            alert("You need to login successfully at least once")
        } else {
            await getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
            await getAccessToken("random@safetyculture.io", "invalid")

            setloginRejectTime(sessionStorage.getItem('reject_time') + " milliseconds")
            setloginResolveTime(sessionStorage.getItem('accept_time') + " milliseconds")

            React.createElement('p', `successful login time: ${loginResolveTime}`)
            console.log(e.target.children)
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
                <h3>Login accept/reject response time test</h3>
                <div onClick={testResponseTime}>
                    <button >Test Login time</button>

                </div>
                <p>successful login time: {loginResolveTime}</p>
                <p>unsucessful login time: {loginRejectTime}</p>
            </div>
        </div>
    )
}

export default Login