import json
from getpass import getpass
from builtins import input
import requests



########################## generate user access token ###############################

def getAuthToken():

    username = input("iAuditor username: ")
    password = getpass()
    generate_token_url = "https://sandpit-api.safetyculture.io/auth"
    payload = "username=" + username + "&password=" + password + "&grant_type=password"
    headers = {
        'content-type': "application/x-www-form-urlencoded",
        'cache-control': "no-cache",
        'sc-integration-id': "safetyculture-sdk-python",
        'sc-integration-version': "4.x",
    }
    response = requests.request("POST", generate_token_url, data=payload, headers=headers)
    if response.status_code == requests.codes.ok:
        userToken = response.json()['access_token']
        #print("Your access token is " + userToken)

    #else:
        #print('An error occurred calling ' + generate_token_url + ': ' + str(response.json()))

    return userToken



########################### filter and search for audit ID's ############################

def searchAudits(userToken):

    auditsURL = "https://sandpit-api.safetyculture.io/audits/search?field=audit_id&modified_after=2019-01-01T00:00:00.000Z&modified_before=2020-01-01T00:00:00.000Z"

    HTTP_USER_AGENT_ID = 'safetyculture-python-sdk'
    header =  {
        'User-Agent': HTTP_USER_AGENT_ID,
        'Authorization': 'Bearer ' + str(userToken),
        'sc-integration-id': "safetyculture-sdk-python",
        'sc-integration-version': "4.x",
    }

    response = requests.get(auditsURL, headers=header)
    output = response.json() if response.status_code == requests.codes.ok else None 
    #print(output)

    auditIDs = []
    for audit in output['audits']: 
        auditIDs.append(audit['audit_id'])
        #print(audit)

    #print(auditIDs[0])

    return auditIDs



################ get score, total score, and failed items from audits ##############################

def getScores(auditIDs, userToken):

    auditURL = "https://sandpit-api.safetyculture.io/audits/"

    HTTP_USER_AGENT_ID = 'safetyculture-python-sdk'
    header =  {
        'User-Agent': HTTP_USER_AGENT_ID,
        'Authorization': 'Bearer ' + str(userToken),
        'sc-integration-id': "safetyculture-sdk-python",
        'sc-integration-version': "4.x",
    }

    score = 0
    totalScore = 0
    failedItems = 0
    for auditID in auditIDs:
        response = requests.get(auditURL + auditID, headers=header)
        audit = response.json() if response.status_code == requests.codes.ok else None 
        #print(audit)
        #print(audit['audit_data']['score'])
        #print(audit['audit_data']['total_score'])

        score += audit['audit_data']['score']
        totalScore += audit['audit_data']['total_score']

        for key in audit['template_data']['response_sets'].keys():
            #print(key)
            #print(audit['template_data']['response_sets'][key]['responses'])
            #print(" ")
            for metaData in audit['template_data']['response_sets'][key]['responses']:
                #print("Data: " + str(metaData))
                if metaData['score'] == 0 and metaData['enable_score'] == True:
                    failedItems += 1
                #for metaKey in metaData.keys():
                    #print(metaKey)

    # print ("Score: " + str(score))
    # print ("Total Score: " + str(totalScore))
    # print("Number of failed items: " + str(failedItems))
    scores = {
        "Score": score,
        "Total Score": totalScore,
        "Failed Items": failedItems
    }
    return scores

token = getAuthToken()
auditIDs = searchAudits(token)
scores = getScores(auditIDs, token)

print("Your token is " + str(token))
print("The audit ID's are: " + str(auditIDs))
print("The scores are: " + str(scores))


