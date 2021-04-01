import React, { Component } from 'react'
import Login from './Login/Login'
import AutomatedTest from './ResponseTests/AutomatedTest'
import GetGroups from './ApiCalls/GetGroups'
import GetUser from './ApiCalls/GetUser'
import SearchInspections from './ApiCalls/SearchInspections'
import SearchTemplates from './ApiCalls/SearchTemplates'
// import { testLoginTime } from './LoginTest'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BASE_URL: sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io"),
            loginResolveTime: '',
            loginRejectTime: '',
            getGroupsTime: GetGroups(),
            getUserTime:  GetUser(),
            getTemplateTime: SearchTemplates(),
            getInspectionTime: SearchInspections(),
            apiToken: sessionStorage.apiToken,
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState(prevState => ({
                getGroupsTime: GetGroups(),
                getUserTime:  GetUser(),
                getTemplateTime: SearchTemplates(),
                getInspectionTime: SearchInspections(),
                apiToken: sessionStorage.apiToken,
            }));
        }, 1000 * 60);
    };

    render() {
        const { getGroupsTime, getUserTime, getTemplateTime, getInspectionTime, apiToken } = this.state
        return (
            <div style={{textAlign: "center"}}>
                <Login />  
                <h3>Automated Testing Test</h3>
                {/* <p>Login Accept: {loginResolveTime}</p>
                <p>Login Reject: {loginRejectTime}</p> */}
                <p>Get Group: {getGroupsTime}</p>
                <p>Get a Group User: {getUserTime}</p>
                <p>Search Template: {getTemplateTime}</p>
                <p>Search Inspection: {getInspectionTime}</p>
            </div>
        )
    }
}

export default App


