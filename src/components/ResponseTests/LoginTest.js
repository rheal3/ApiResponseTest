import React, {useState} from 'react'
import getAccessToken from '../Login/GetAccessToken'
const LoginTest = () => {
    const [loginResolveTime, setloginResolveTime] = useState('')
    const [loginRejectTime, setloginRejectTime] = useState('')

    const handleClick = async () => {
        await testResponseTime()
        setloginResolveTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
        setloginRejectTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    return (
        <div>
            <h3>Login accept/reject response time test</h3>
            <div onClick={handleClick}>
                <button >Test Login time</button>

            </div>
            <p>successful login time: {loginResolveTime}</p>
            <p>unsucessful login time: {loginRejectTime}</p>
        </div>
    )

   
}

export async function testResponseTime() {
    if (!sessionStorage['apiToken']) {
        alert("You need to login successfully at least once")
    } else {
        await getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
        await getAccessToken("random@safetyculture.io", "invalid")
        console.log("Accept Time: " + JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
        console.log("Reject Time: " + JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
}
export default LoginTest