import React, {useState} from 'react'
import GetGroups from '../ApiCalls/GetGroups'
import GetUser from '../ApiCalls/GetUser'
import SearchInspections from '../ApiCalls/SearchInspections'
import SearchTemplates from '../ApiCalls/SearchTemplates'
import { getData, getLastDataPointTime } from '../dataStorage'
import { testLoginTime } from './LoginTest'

const AutomatedTest = () => {
    const [loginResolveTime, setloginResolveTime] = useState('')
    const [loginRejectTime, setloginRejectTime] = useState('')
    const [getGroupsTime, setGroupsTime] = useState('')
    const [getUserTime, setUserTime] = useState('')
    const [getTemplateTime, setTemplateTime] = useState('')
    const [getInspectionTime, setInspectionTime] = useState('')
    const [getIsTesting, setIsTesting] = useState(false)


    const startTests = () => {
        if (sessionStorage['apiToken']) {
            setIsTesting(true)
            let intervalID = setInterval(async () => {
                if(!sessionStorage.getItem('intervalID')) {
                    sessionStorage.setItem('intervalID', intervalID)
                }
                // console.log("In interval with ID: " + intervalID)
                
                await runTests()
                // await getData('access_token');
                await getLastDataPointTime('users');
                setloginResolveTime(await getLastDataPointTime('access_token'));
                setloginRejectTime(await getLastDataPointTime('access_token'));
                setGroupsTime(await getLastDataPointTime('groups'));
                setUserTime(await getLastDataPointTime('users'));
                setTemplateTime(await getLastDataPointTime('templates'));
                setInspectionTime(await getLastDataPointTime('inspections'));

                // setloginResolveTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 6]['time'])
                // setloginRejectTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 5]['time'])
                // setGroupsTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 4]['time'])
                // setUserTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 3]['time'])
                // setTemplateTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 2]['time'])
                // setInspectionTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
            }, 10000)
        } else {
            alert("You need to login first")
        }
    }

    const stopTests = () => {
        setIsTesting(false)
        // console.log("I'm supposed to stop the timer with ID: " + sessionStorage.getItem('intervalID') + " !!")
        clearInterval(sessionStorage.getItem('intervalID'))
        sessionStorage.removeItem('intervalID')
    }
 

    return (
        <div>
            <h3>Automated Testing Test</h3>
            {!getIsTesting && (<button onClick={startTests}>Start Tests</button>)}
            <br/>
            {getIsTesting && (<button onClick={stopTests}>Stop Tests</button>)}
            <br/>
            <p>Login Accept: {loginResolveTime}</p>
            <p>Login Reject: {loginRejectTime}</p>
            <p>Get Group: {getGroupsTime}</p>
            <p>Get a Group User: {getUserTime}</p>
            <p>Search Template: {getTemplateTime}</p>
            <p>Search Inspection: {getInspectionTime}</p>
        </div>
    )
}

async function runTests() {
    await testLoginTime()
    await GetGroups()
    await GetUser()
    await SearchTemplates()
    await SearchInspections()
}

export default AutomatedTest