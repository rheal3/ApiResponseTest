import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'

const GetGroupsTest = () => {
    const [getGroupsTime, setGroupsTime] = useState('')

    const handleClick = async () => {
        await GetGroups()
        setGroupsTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    

    return (
        <div>
            <div>
            <h3>Get Groups response time test</h3>
            <button onClick={handleClick}>Get Group Times</button>
            </div>
            <p>Get Groups Time: {getGroupsTime}</p>
        </div>
    )
}

export default GetGroupsTest