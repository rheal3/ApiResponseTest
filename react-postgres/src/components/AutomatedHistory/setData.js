export const setDataFunc = (allPastData, dataStore, keyName, i) => {
    let old = dataStore;
          old.push({
            x: allPastData[keyName]['date_time'][i],
            y: allPastData[keyName]['time'][i]
          })
          return old;
}

export const setTime = (time) => {
    let msTime;
    switch (time) {
      case "hour":
        msTime = 3600000;
        break;
      case "thirty-min":
        msTime = 1800000;
        break;
      case "fifteen-min":
        msTime = 900000;
        break;
      case "five-min":
        msTime = 300000;
        break;
      case "one-min":
        msTime = 60000;
        break;
      case "thirty-secs":
        msTime = 30000;
        break;
      case "ten-secs":
        msTime = 10000;
        break;
    }
    return msTime;
}