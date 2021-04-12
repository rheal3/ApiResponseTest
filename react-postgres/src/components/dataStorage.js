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

// gets the data from the specified table
export const getData = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}`);
        const jsonData = await response.json();

       return jsonData
    } catch (err) {
        console.log(err.message);
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


export const getAllDataFromTable = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}`);
        const jsonData = await response.json();
        return jsonData;

    } catch (err) {
        console.log(err.message)
    }
}

export const formatTableData = (data) => {
    let formatData = {'date_time': [], 'time': []}
    for (let i = 0; i <= data.length -1; i++) {
        formatData['date_time'].push(data[i]['date_time'])
        formatData['time'].push(data[i]['time'])
    }
    return formatData;
}

export const getAllData = async () => {
    let allData = {};
    Promise.all([
        await getAllDataFromTable('access_token').then(formatTableData),
        await getAllDataFromTable('groups').then(formatTableData),
        await getAllDataFromTable('users').then(formatTableData),
        await getAllDataFromTable('templates').then(formatTableData),
        await getAllDataFromTable('inspections').then(formatTableData),
      ]).then((values) => {
        allData['access_token'] = values[0];
        allData['groups'] = values[0];
        allData['users'] = values[0];
        allData['templates'] = values[0];
        allData['inspections'] = values[0];
    })
    return allData;
}