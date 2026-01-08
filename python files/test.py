from flask import Flask, render_template, flash, request, redirect, url_for
from flask_migrate import Migrate
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, LoginManager, login_required, logout_user, current_user, UserMixin
from admin.webforms import PostForm, LoginForm, UserForm, Form
from flask_sqlalchemy import SQLAlchemy
from flask_ckeditor import CKEditor
import uuid as uuid

#flask variable settings: $env:FLASK_ENV = "appname"
#flask variable settings: $env:FLASK_APP = "development"
#password hashing method: pbkdf2:sha256, pbkdf2:sha1

app = Flask(__name__)
ckeditor = CKEditor(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
app.app_context().push()
#upload_folder = 'static/images/'
#app.config['upload_folder'] = upload_folder


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

#FILTERS
#safe
#capitalize
#lower
#upper
#trim
#striptags

@app.route("/admin", methods=['GET','POST'])
@login_required
def admin():
        id = current_user.id
        if id == 1:
            our_users = Users.query.order_by(Users.date_added)
            return render_template("admin.html", our_users=our_users)
        else:
              flash("Can only be accessed by admin!!")
              return redirect(url_for('dashboard'))

@app.route('/add-post', methods=['GET', 'POST'])
@login_required
def add_post():
      form = PostForm()
      if form.validate_on_submit():
            poster = current_user
            post = Posts(title=form.title.data or "", content=form.content.data, poster=poster)
            form.title.data = ''
            form.content.data = ''
            #form.slug.data = '' 
            db.session.add(post)
            db.session.commit()
            flash("Blog Post Submitted Successfully!")
      return render_template("add_post.html", form=form)      

@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
      return render_template("dashboard.html")


@app.route('/posts/delete/<int:id>')
@login_required
def delete_post(id):
      post_to_delete = Posts.query.get_or_404(id)
      id = current_user
      if id == post_to_delete.poster or 1:
            try:
                  db.session.delete(post_to_delete)
                  db.session.commit()
                  posts = Posts.query.order_by(Posts.date_posted)
                  return render_template("posts.html", posts=posts)
            except:
                  flash("Error! There was a problem deleting the post, try again please.")
                  posts = Posts.query.order_by(Posts.date_posted)
                  return render_template("posts.html", posts=posts)
      else: 
                  flash("Unauthorized action!")
                  posts = Posts.query.order_by(Posts.date_posted)
                  return render_template("posts.html", posts=posts)
      

@app.route('/delete/<int:id>')
@login_required
def delete(id):
      user_to_delete = Users.query.get_or_404(id)
      name = None
      form = UserForm()
      if id == current_user.id:
            try:
                  db.session.delete(user_to_delete)
                  db.session.commit()
                  flash("User Has Been Deleted!")
                  our_users = Users.query.order_by(Users.date_added)
                  return render_template("user.html", form=form, name=name, our_users=our_users)
            except:
                  flash("Error! Looks like a problem occured, try again please")
                  our_users = Users.query.order_by(Users.date_added)
                  return render_template("user.html", form=form, name=name, our_users=our_users)
      if current_user.id == 1:
            try:
                  db.session.delete(user_to_delete)
                  db.session.commit()
                  flash("User Has Been Deleted!")
                  our_users = Users.query.order_by(Users.date_added)
                  return render_template("admin.html", form=form, name=name, our_users=our_users)
            except:
                  flash("Error! Looks like a problem occured, try again please")
                  our_users = Users.query.order_by(Users.date_added)
                  return render_template("admin.html", form=form, name=name, our_users=our_users)
      else:
            flash("Unauthorized action!")
            return redirect(url_for('dashboard'))


@app.route('/posts/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_post(id):
      post = Posts.query.get_or_404(id)
      form = PostForm()
      if form.validate_on_submit():
            post.title = form.title.data
            post.content = form.content.data
            #post.slug = form.slug.data
            db.session.add(post)
            db.session.commit()
            flash("Post Edited Successfully!")
            return redirect(url_for('post', id=post.id))
      if current_user.id == post.poster_id:
            form.title.data = post.title
            #form.slug.data = post.slug
            form.content.data = post.content
            return render_template("edit_post.html", form=form)
      else:
            flash('Unauthorized action!')
            return redirect(url_for('post', id=post.id))


@app.errorhandler(404)
def error_404(e):
        return render_template("404.html"), 404
        
@app.errorhandler(500)
def error_500(e):
        return render_template("500.html"), 500


@app.route('/form', methods = ['POST', 'GET'])
def form():
    name = None
    form = Form()
    if form.validate_on_submit():
        name = form.Name.data
        form.Name.data = ''
        flash("Form Submitted Successfully") 
    return render_template("form_acc.html", name=name, form=form)

"""                    
        <!--{{ form.About_author.label ( class="form-label" ) }}
        {{ form.About_author(class="form-control") }}

        {{ form.Profile_pic.label ( class="form-label" ) }}
        {{ form.Profile_pic(class="form-control") }}-->
        
        {{ form.Fav_color.label ( class="form-label" ) }}
        {{ form.Fav_color(class="form-control") }}

        
        {{ form.Fav_color.label ( class="form-label" ) }}
        {{ form.Fav_color(class="form-control", value=name_to_update.fav_color) }}
    
"""

@app.route("/")
def lp():
        return render_template("landing_page.html")

@app.route('/login', methods=['GET', 'POST'])
def login():
      form = LoginForm()
      if form.validate_on_submit():
            user = Users.query.filter_by(user_name=form.Username.data, email=form.Email.data).first()
            if user:
                  if check_password_hash(user.password_hash, form.Password.data or ""):
                        login_user(user) #remember=form.Remember_Me.data)
                        flash("Login Successful!")
                        return redirect(url_for('dashboard'))
                  else:
                        flash("Wrong Password - Try Again!")
            else:
                  flash("That User Doesn't Exist - Try Again!")
      return render_template("login.html", form=form)


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
      logout_user()
      flash("You have been logged out!")
      return redirect(url_for('login'))

@login_manager.user_loader
def load_user(user_id):
      return Users.query.get(int(user_id))

@app.route('/posts')
def posts():
      posts = Posts.query.order_by(Posts.date_posted)
      return render_template("posts.html", posts=posts)

@app.route('/post/<int:id>')
def post(id):
      post = Posts.query.get_or_404(id)
      return render_template("post.html", post=post)

                    
@app.route('/update/<int:id>', methods=['POST', 'GET'])
@login_required
def update(id):
      form = UserForm()
      name_to_update = Users.query.get_or_404(id)
      id = current_user.id
      if request.method == "POST":
              name_to_update.name = request.form.get('Name')
              name_to_update.email = request.form.get('Email')
              #name_to_update.fav_color = request.form.get('Fav_color')
              name_to_update.user_name = request.form.get('Username')
              name_to_update.birthday = request.form.get('Birthday')
              #name_to_update.about_author = request.form.get('About_author')
              try:
                        db.session.commit()                 
                        flash("User Updated Successfully")
                        return render_template("update.html", form=form, name_to_update=name_to_update, id=id)
              except:
                        flash("Error! Looks like a problem occured, try again please")
                        return render_template("update.html", form=form, name_to_update=name_to_update, id=id)
      else:
            db.session.commit() 
            flash("User Updated Successfully")
            return render_template("update.html", form=form, name_to_update=name_to_update, id=id) 
          
""" 
if request.files.get('Profile_pic'):
            name_to_update.profile_pic = request.files.get('Profile_pic')
            pic_filename = secure_filename(name_to_update.profile_pic.filename)
            pic_name = str(uuid.uuid1()) + "_" + pic_filename
            saver = request.files.get('Profile_pic')
            name_to_update.profile_pic = pic_name

"""

@app.route('/user/add', methods=['POST', 'GET'])
def user():
       name = None
       form = UserForm()
       if form.validate_on_submit():
             user = Users.query.filter_by(email=form.Email.data).first()
             if user is None:
                   hashed_pw = generate_password_hash(form.Password.data or "", method='pbkdf2:sha256')
                   user = Users(user_name=form.Username.data or "", name=form.Name.data or "", password_hash=hashed_pw, email=form.Email.data, birthday=form.Birthday.data)
                   db.session.add(user)
                   db.session.commit()
             name = form.Name.data
             form.Username.data = ''
             form.Name.data = ''
             form.Email.data = ''
             #form.Fav_color.data = ''
             form.Birthday.data = None
             form.Password.data = ''
             flash("User Added Successfully")
       our_users = Users.query.order_by(Users.date_added)
       return render_template("user.html", form=form, name=name, our_users=our_users)
      
#@app.route('/user/<name>')
#def user(name):
        #return render_template("user.html", user_name=name)
        #return "<h1>Hello {}!!!</h1>".format(name)

        
class Posts(db.Model):
      __tablename__ = "Posts"
      id = db.Column(db.Integer, primary_key=True)
      title = db.Column(db.String((255)))
      content = db.Column(db.Text)
      #author = db.Column(db.String(255))
      date_posted = db.Column(db.DateTime, default=datetime.utcnow)
      #slug = db.Column(db.String(255))
      poster_id = db.Column(db.Integer, db.ForeignKey('users.id'))

      def __init__(self, title: str, content: str, **kwargs):
             super().__init__(**kwargs)
             self.title = title
             self.content = content


class Users(db.Model, UserMixin):
       __tablename__ = "users"
       id = db.Column(db.Integer, primary_key=True)
       user_name = db.Column(db.String(20), nullable = False, unique=True)
       name = db.Column(db.String(200), nullable=False)
       email = db.Column(db.String(120), nullable=False, unique=True)
       birthday = db.Column(db.String(), nullable=True)
       #fav_color = db.Column(db.String(120))
       #about_author = db.Column(db.Text(520), nullable=True)
       date_added = db.Column(db.DateTime,default=datetime.utcnow)
       #profile_pic = db.Column(db.String(), nullable=True)
       password_hash = db.Column(db.String(128))
       posts = db.relationship('Posts', backref = 'poster')

       def __init__(self, user_name: str, name: str, **kwargs):
             super().__init__(**kwargs)
             self.user_name = user_name
             self.name = name

       @property
       def password(self):
             raise AttributeError('Password is not readable')

       @password.setter
       def password(self, password):
             self.password_hash = generate_password_hash(password)

       def verify_password(self, password):
             return check_password_hash(self.password_hash, password)

       def __repr__(self):
              return '<Name %r>' % self.name


if __name__ == '__main__':
        app.run(debug=True)