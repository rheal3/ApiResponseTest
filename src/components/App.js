import React from 'react'
import Login from './Login/Login'
import GetUSers from './ApiCalls/GetUsers'
import GetGroups from './ApiCalls/GetGroups'
import SearchTemplates from './ApiCalls/SearchTemplates'
import SearchInspections from './ApiCalls/SearchInspections'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login/>
        <br/>
        <GetGroups/>
        <br/>
        <GetUSers/>
        <br/>
        <SearchTemplates/>
        <SearchInspections/>

        </div>
    )
}

export default App