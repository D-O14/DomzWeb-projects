from flask import Flask, render_template, flash
from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SubmitField, PasswordField
from wtforms.validators import DataRequired
#from flask_login import login_user, LoginManager, login_required, logout_user, current_user, UserMixin

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your_secret_key'

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('project.html')

class SignInForm(FlaskForm):
    Username = StringField('Username', validators=[DataRequired()])
    Name = StringField('Name', validators = [DataRequired()])
    Email = EmailField('Email', validators = [DataRequired()])
    Password = PasswordField('Password', validators = [DataRequired()])
    Submit = SubmitField('Sign-Up', validators=[DataRequired("Sign in successful")])

@app.route('/sign-up', methods=['POST', 'GET'])
def signUp():
    name = None
    form = SignInForm()
       #if form.validate_on_submit():
             #user = Users.query.filter_by(email=form.Email.data).first()
    if signUp is None:
                #hashed_pw = generate_password_hash(form.Password.data or "", method='pbkdf2:sha256')
                #user = Users(user_name=form.Username.data or "", name=form.Name.data or "", password_hash=hashed_pw, email=form.Email.data, birthday=form.Birthday.data)
                #db.session.add(user)
                #db.session.commit()
        name = form.Name.data
    form.Username.data = ''
    form.Name.data = ''
    form.Email.data = ''
    #form.Fav_color.data = ''
    #form.Birthday.data = None
    form.Password.data = ''
    flash("User Added Successfully")
    #our_users = Users.query.order_by(Users.date_added)
    return render_template("sign-up.html", form=form, name=name)

if __name__ == '__main__':
    app.run(debug=True)