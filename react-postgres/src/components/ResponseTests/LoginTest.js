import React, {useState} from 'react'
import getAccessToken from '../Login/GetAccessToken'
const LoginTest = () => {
    const [loginResolveTime, setloginResolveTime] = useState('')
    const [loginRejectTime, setloginRejectTime] = useState('')

    const handleClick = async () => {
        await testLoginTime()
        setloginResolveTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
        setloginRejectTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    return (
        <div>
            <h3>Login accept/reject response time test</h3>
            <div >
                <button onClick={handleClick} >Test Login time</button>

            </div>
            <p>successful login time: {loginResolveTime}</p>
            <p>unsucessful login time: {loginRejectTime}</p>
        </div>
    )

   
}

export async function testLoginTime() {
    if (!sessionStorage['apiToken']) {
        alert("You need to login successfully at least once")
    } else {
        await getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
        await getAccessToken("random@safetyculture.io", "invalid")
    }
}
export default LoginTest