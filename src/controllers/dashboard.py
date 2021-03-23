from flask import Blueprint, request, render_template, redirect, url_for

dashboard = Blueprint("dashboard", __name__, url_prefix="/")

@dashboard.route("/", methods=["GET"])
def index():
    return render_template("dashboard.html")

