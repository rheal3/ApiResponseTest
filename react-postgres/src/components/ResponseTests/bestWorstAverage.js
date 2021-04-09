
// gets the best time for each API calls
export const getBestTime = async (idObj) => {
    try {
        let returnObj = {};
        for (const [tableName, id] of Object.entries(idObj)) {
            if (tableName !== 'access_token') {
                const response = await fetch(`http://localhost:5000/${tableName}/best/${id}`);
                const jsonData = await response.json();
                returnObj[tableName] = jsonData;
            } else {
                const trueResponse = await fetch(`http://localhost:5000/${tableName}/best/${id}/true`);
                const trueJsonData = await trueResponse.json();
                returnObj[`${tableName}_true`] = trueJsonData;
                const falseResponse = await fetch(`http://localhost:5000/${tableName}/best/${id}/false`);
                const falseJsonData = await falseResponse.json();
                returnObj[`${tableName}_false`] = falseJsonData;
            }
          }
        return returnObj;
        
    } catch (err) {
        console.log(err.message);
    }
}

// gets the worst time for each API calls
export const getWorstTime = async (idObj) => {
    try {
        let returnObj = {};
        for (const [tableName, id] of Object.entries(idObj)) {
            if (tableName !== 'access_token') {
                const response = await fetch(`http://localhost:5000/${tableName}/worst/${id}`);
                const jsonData = await response.json();
                returnObj[tableName] = jsonData;
            } else {
                const trueResponse = await fetch(`http://localhost:5000/${tableName}/worst/${id}/true`);
                const trueJsonData = await trueResponse.json();
                returnObj[`${tableName}_true`] = trueJsonData;
                const falseResponse = await fetch(`http://localhost:5000/${tableName}/worst/${id}/false`);
                const falseJsonData = await falseResponse.json();
                returnObj[`${tableName}_false`] = falseJsonData;
            }
          }
        return returnObj;
        
    } catch (err) {
        console.log(err.message);
    }
}

// gets the average time for each API calls
export const getAvgTime = async (idObj) => {
    try {
        let returnObj = {};
        for (const [tableName, id] of Object.entries(idObj)) {
            if (tableName !== 'access_token') {
                const response = await fetch(`http://localhost:5000/${tableName}/avg/${id}`);
                const jsonData = await response.json();
                returnObj[tableName] = jsonData;
            } else {
                const trueResponse = await fetch(`http://localhost:5000/${tableName}/avg/${id}/true`);
                const trueJsonData = await trueResponse.json();
                returnObj[`${tableName}_true`] = trueJsonData;
                const falseResponse = await fetch(`http://localhost:5000/${tableName}/avg/${id}/false`);
                const falseJsonData = await falseResponse.json();
                returnObj[`${tableName}_false`] = falseJsonData;
            }
          }
        //   console.log(returnObj)
        return returnObj;
        
    } catch (err) {
        console.log(err.message);
    }
}