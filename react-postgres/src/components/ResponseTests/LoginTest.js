import getAccessToken from '../Login/GetAccessToken'

// runs the successful and rejected login test by using the stored login password details and dummy data
export async function testLoginTime() {
    if (!sessionStorage['apiToken']) {
        alert("You need to login successfully at least once")
    } else {
        await getAccessToken(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
        await getAccessToken("random@safetyculture.io", "invalid")
    }
}
