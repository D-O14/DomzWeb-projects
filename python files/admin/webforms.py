from flask import flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, EmailField, PasswordField, FileField, DateField, SelectField
from wtforms.validators import DataRequired, EqualTo, Length
from wtforms.widgets import TextArea
from flask_ckeditor import CKEditorField

#class SearchForm(FlaskForm):
      #searched = StringField("Searched", validators=[DataRequired()])
      #Submit = SubmitField("Search")

class LoginForm(FlaskForm):
      Username = StringField("Username", validators=[DataRequired()])
      Password = PasswordField("Password", validators=[DataRequired()])
      Email = EmailField("E-mail", validators=[DataRequired()])
      #Remember_Me = BooleanField("Remember Me")
      Submit = SubmitField("Login")
      
class PostForm(FlaskForm):
      title = StringField("Title", validators=[DataRequired()])
      #content = StringField("Content", validators=[DataRequired()], widget=TextArea())
      content = CKEditorField('Content', validators=[DataRequired()])
      author = StringField("Author")
      #slug = StringField("Slug", validators=[DataRequired()])
      submit = SubmitField("Post")

class UserForm(FlaskForm):
    Username = StringField("Username", validators=[DataRequired()])
    Name = StringField("Name", validators=[DataRequired()])
    Email = EmailField("E-mail", validators=[DataRequired()])
    Birthday = DateField("Birthday?")
    #Fav_color = StringField("Favorite color")
    #About_author = TextAreaField("About author")
    #Profile_pic = FileField("Profile pic")
    Password = PasswordField("Password", validators=[DataRequired(), Length(min=6, max=12)])
    Password2 = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo('Password', message='Passwords must match!'),])
    Submit = SubmitField("Submit")

class Form(FlaskForm):
    Name = StringField("What's your name?", validators=[DataRequired()])
    Email = EmailField("What's your E-mail?", validators=[DataRequired()])
    Password = PasswordField("Please set a password", validators=[DataRequired()])
    Submit = SubmitField("Submit")

class formGroup(FlaskForm):
    Name = StringField("Name", validators=[DataRequired()])
    Email = EmailField("Email", validators=[DataRequired()])
    Submit = SubmitField("Submit")