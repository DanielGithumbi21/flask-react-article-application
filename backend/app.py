from flask import Flask,jsonify
from flask.globals import request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask (__name__)

CORS (app)

app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow (app)


class Posts (db.Model):
    id = db.Column (db.Integer,primary_key = True)
    title = db.Column (db.String(200),nullable= False)
    body = db.Column (db.Text,nullable= False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)

    def __init__(self,title,body):
        self.title = title
        self.body = body

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id','title','body','created_at')


article_schema = ArticleSchema ()
articles_schema = ArticleSchema (many=True)

@app.route('/',methods=['GET'])
def home():
  all_articles = Posts.query.order_by(Posts.created_at).all ()
  results = articles_schema.dump(all_articles)
  return jsonify(results)
@app.route('/<id>/',methods=['GET'])
def single_article(id):
   article = Posts.query.get(id)
   return articles_schema.jsonify(article)

@app.route('/add',methods = ['POST'])
def add_article():
   title = request.json['title']
   body = request.json['body']

   articles = Posts (title,body)
   db.session.add(articles)
   db.session.commit ()
   return article_schema.jsonify(articles)
@app.route('/update/<id>/',methods=['PUT'])
def update(id):
   article = Posts.query.get(id)

   title = request.json['title']
   body = request.json['body']

   article.title = title
   article.body = body

   db.session.commit ()

   return article_schema.jsonify (article)

@app.route('/delete/<id>/',methods = ['DELETE'])
def delete(id):
   article = Posts.query.get(id)
   db.session.delete (article)
   db.session.commit ()
   return article_schema.jsonify(article)

if __name__ == '__main__':
    app.run(debug=True)