// get all data from table
export const getAllDataFromTable = async (tableName) => {
    try {
        const response = await fetch(`http://localhost:5000/${tableName}`);
        const jsonData = await response.json();
        return jsonData;

    } catch (err) {
        console.log(err.message)
    }
}

// format data to get date_time and time in lists (for chart mapping)
export const formatTableData = (data) => {
    let formatData = {'date_time': [], 'time': []}
    for (let i = 0; i <= data.length -1; i++) {
        formatData['date_time'].push(data[i]['date_time'])
        formatData['time'].push(data[i]['time'])
    }
    return formatData;
}

// get data from all tables and put into obj
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


// FILTER DATA TO GET DATES //
// get all data from table within timeframe
// TIMEFRAMES formats: '1 HOUR', '1 DAY', '1 WEEK', '2 WEEKS', '1 MONTH', ETC 
export const getDataInTimeframe = async (tableName, timeframe) => {
    try {
        const response = await fetch(`http://localhost:5000/timeframe/${tableName}/${timeframe}`);
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err.message)
    }
}