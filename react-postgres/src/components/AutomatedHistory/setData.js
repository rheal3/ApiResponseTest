export const setDataFunc = (allPastData, dataStore, keyName, i) => {
    let old = dataStore;
          old.push({
            x: allPastData[keyName]['date_time'][i],
            y: allPastData[keyName]['time'][i]
          })
          return old;
}
