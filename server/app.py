from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.flask_db
todos = db.todos

@app.route('/blablabla', methods=('GET', 'POST'))
def blablabla():
    return "hello"