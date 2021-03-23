from flask import Flask
import dotenv

def create_app():
    app = Flask(__name__)

    from controllers import registerable_controllers
    for controller in registerable_controllers:
        app.register_blueprint(controller)

    return app
