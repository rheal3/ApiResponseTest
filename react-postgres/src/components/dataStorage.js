// gets the date and time to be used for timestamping the data
export const dateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

// handles how the data gets stored to the database
export const storeData = async (data) => {
    // tableName, responseOk, time, numItemsRetrieved, dateTime
    try {
        await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.log(err.message)
    }
}

// gets the latest data from the specified table
export const getLastDataPointTime = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}/last`);
        const jsonData = await response.json();

        return jsonData[0];

    } catch (err) {
        console.log(err.message);
    }
}

// gets the most recent datapoint from the access token table using the true/false status to filter out the successful/rejected logins
export const getLoginDataPoint = async (status) => {
    try {
        const response = await fetch(`http://localhost:5000/login/${status}`);
        const jsonData = await response.json();

        return jsonData[0];

    } catch (err) {
        console.log(err.message);
    }
}
// gets the data and time from the specified table
export const getDateTime = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}/last`);
        const jsonData = await response.json();

        return jsonData[0]['date_time'];

    } catch (err) {
        console.log(err.message);
    }
}

