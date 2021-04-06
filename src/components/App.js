import React from 'react'
import Login from './Login/Login'
// import Charts from './Charts/TestCharts'
// import LoginTest from './ResponseTests/LoginTest'
// import GetGroupsTest from './ResponseTests/GetGroupsTest'
// import GetUsersTest from './ResponseTests/GetUserTest'
// import SearchTemplatesTest from './ResponseTests/SearchTemplatesTest'
// import SearchInspectionsTest from './ResponseTests/SearchInspectionsTest'

import AutomatedTest from './ResponseTests/AutomatedTest'

const App = () => {
    sessionStorage.setItem('BASE_URL', "https://sandpit-api.safetyculture.io")

    return(
        <div>

        <Login/>
        <AutomatedTest/>
        {/* <Charts/> */}

   
        </div>
    )
}

export default App