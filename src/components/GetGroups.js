import React from 'react'

const GetGroups = (props) => {
    const BASE_URL = "https://sandpit-api.safetyculture.io"
    let groupState =[]

    const buttonClicked = () => {
        let url = BASE_URL + '/share/connections'
    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        const newGroupState = data.map((group) => {
            return group
        })
        groupState = newGroupState

    }).catch(error => console.log(error))
    }



    return (
       <div>
           <button onClick={buttonClicked}>Get Groups</button>
           <div>

               <ul>
                   {groupState.map((group) => {
                       return <li key={group}>{group}</li>
                   })}
               </ul>

           </div>
       </div>
    )
}

export default GetGroups