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
        if (!sessionStorage['apiToken']) {
            alert("You need to login successfully at least once")
        } else {
            await getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
            await getAccessToken("random@safetyculture.io", "invalid")

            setloginResolveTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
            setloginRejectTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
        }
    }

    return (
        <div>
            <div style={{textAlign: "right"}}>
                {!sessionStorage.getItem('apiToken') && (<input type="text" value={usernameValue} onChange={handleUsernameInputChange} placeholder="email" />)}
                {!sessionStorage.getItem('apiToken') && (<input type="password" value={passwordValue} onChange={handlePasswordInputChange} placeholder="password" />)}
                {!sessionStorage.getItem('apiToken') && (<button onClick={() => {
                    getAccessToken(usernameValue, passwordValue)
                    setUsernameValue('')
                    setPasswordValue('')
                }}>LOGIN</button>)}
                {sessionStorage.getItem('apiToken') && (<button onClick={() => {
                    delete sessionStorage.apiToken
                    delete sessionStorage.username
                    delete sessionStorage.password
                }}>LOGOUT</button>)}
            </div>
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