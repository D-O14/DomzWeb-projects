from flask import Flask, render_template
from admin.webforms import formGroup

app = Flask(__name__)

app.route('/indexform',methods=['GET', 'POST'])
def form():
    form = formGroup()
    return render_template('index.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)