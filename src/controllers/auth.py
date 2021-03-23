from flask import Blueprint, request, abort, render_template, redirect, url_for
import requests

auth = Blueprint('auth', __name__)

def get_token(username, password):
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
        api_token = response.json()['access_token']
        return api_token
    else:
        return abort(401, description="Incorrect Login Details")


@auth.route("/auth/login", methods=["GET", "POST"])
def auth_login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')

        api_token = get_token(email, password)

        return redirect(url_for('dashboard.index', api_token=api_token))
        # return render_template("dashboard.html", api_token=api_token)
    return render_template("login.html")
