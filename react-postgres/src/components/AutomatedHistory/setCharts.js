export const mainChartDetails = (acceptData, rejectData, groupData, userData, templateData, inspectionData) => {
    return {
        datasets: [{
            label: 'Login Accept',
            data: acceptData,
            fill: false,
            borderColor: [
              'rgb(0, 200, 0)'
            ],
            tension: 0.1
          }, {
            // Login Reject
            label: 'Login Reject',
            data: rejectData,
            fill: false,
            borderColor: [
              'rgb(255, 0, 0)'
            ],
            tension: 0.1
          }, {
            // Group 
            label: 'Group',
            data: groupData,
            fill: false,
            borderColor: [
              'rgb(128, 128, 0)'
            ],
            tension: 0.1
          }, {
            // User
            label: 'User',
            data: userData,
            fill: false,
            borderColor: [
              'rgb(64, 64, 64)'
            ],
            tension: 0.1
          }, {
            // Template
            label: 'Template',
            data: templateData,
            fill: false,
            borderColor: [
              'rgb(128, 0, 128)'
            ],
            tension: 0.1
          }, {
            // Inspection
            label: 'Inspection',
            data: inspectionData,
            fill: false,
            borderColor: [
              'rgb(0, 0, 255)'
            ],
            tension: 0.1
          }]
    }
}

export const loginChartDetails = (acceptData, rejectData) => {
    return {
        datasets: [{
            label: 'Login Accept',
            data: acceptData,
            fill: false,
            borderColor: [
              'rgb(0, 200, 0)'
            ],
            tension: 0.1
          }, {
            label: 'Login Reject',
            data: rejectData,
            fill: false,
            borderColor: [
              'rgb(255, 0, 0)'
            ],
            tension: 0.1
          }]
    }
}

export const setChartDetails = (label, data, color) => {
    return {
        datasets: [{
            label: label,
            data: data,
            fill: false,
            borderColor: [
              color
            ],
            tension: 0.1
          }]
    }
}
