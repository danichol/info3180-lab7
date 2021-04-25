from flask import Flask
from app.config import Config
from flas_wtf.csrf import CSRFProtect

app = Flask(__name__)
csrd = CSRFProtect(app)

app.config.from_object(Config)

from app import views
