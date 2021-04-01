import React from 'react'
import Login from './Login/Login'
import LoginTest from './ResponseTests/LoginTest'
import GetGroupsTest from './ResponseTests/GetGroupsTest'
import GetUsersTest from './ResponseTests/GetUserTest'
import SearchTemplatesTest from './ResponseTests/SearchTemplatesTest'
import SearchInspectionsTest from './ResponseTests/SearchInspectionsTest'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login/>
        <LoginTest/>
        <GetGroupsTest/>
        <GetUsersTest/>
        <SearchTemplatesTest/>
        <SearchInspectionsTest/>
   
        </div>
    )
}

export default App