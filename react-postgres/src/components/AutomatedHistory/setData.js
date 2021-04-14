export const setDataFunc = (allPastData, dataStore, keyName, i) => {
    let old = dataStore;
          old.push({
            x: allPastData[keyName]['date_time'][i],
            y: allPastData[keyName]['time'][i]
          })
          return old;
}

export const setPromiseTimeFrame = (dropDownValue) => {
    let timeFrame;
    switch (dropDownValue) {
        case "last24Hours":
            timeFrame = '24 HOURS';
            break;
        case "last7Days":
            timeFrame = '7 DAYS';
            break;
        case "last2Weeks":
            timeFrame = '2 WEEKS';
            break;
        case "lastMonth":
            timeFrame = '1 MONTH';
            break;
                        
    }
    return timeFrame;
}