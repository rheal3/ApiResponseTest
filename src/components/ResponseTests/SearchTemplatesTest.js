import React, {useState} from 'react'
import SearchTemplates from '../ApiCalls/SearchTemplates'

const SearchTemplatesTest = () => {
    const [getTemplateTime, setTemplateTime] = useState('')

    const handleClick = async () => {
        await SearchTemplates()

        setTemplateTime(JSON.parse(localStorage.getItem('saveData'))[JSON.parse(localStorage.getItem('saveData')).length - 1]['time'])
    }
    return (
        <div>
            <div>
            <h3>Search Templates response time test</h3>
            <button onClick={handleClick}>Search Templates</button>
            </div>
            <p>Search Templates Time: {getTemplateTime}</p>
        </div>
    )
}

export default SearchTemplatesTest