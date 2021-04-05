import React, {useState} from 'react'
import GetUsers from '../ApiCalls/GetUser'

const GetUserTest = () => {
    const [getUserTime, setUserTime] = useState('')

    const handleClick = async () => {
        await GetUsers()

        setUserTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    

    return (
        <div>
            <div>
            <h3>Get A Group User response time test</h3>
            <button onClick={handleClick}>Get User Time</button>
            </div>
            <p>Get User Time: {getUserTime}</p>
        </div>
    )
}

export default GetUserTest