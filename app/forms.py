from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileRequired, FileAllowed

class UploadForm(FlaskFOrm):
    description=TextAreaField('Description', validators=[DataRequired()])
    photo = FileField('Photo', validatos=[FileRequired(), FileAllowed(['png','jpg'])])
    
