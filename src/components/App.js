import React from 'react'
import Login from './Login/Login'
import GetUsers from './ApiCalls/GetUsers'
import GetGroups from './ApiCalls/GetGroups'
import SearchTemplates from './ApiCalls/SearchTemplates'
import SearchInspections from './ApiCalls/SearchInspections'


const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login />
        <p>Log in to use these super cool features: </p>
        <GetGroups />
        <GetUsers />
        <SearchTemplates />
        <SearchInspections />

        </div>
    )
}

export default App