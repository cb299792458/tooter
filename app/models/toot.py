from .db import db, environment, SCHEMA
from sqlalchemy import TIMESTAMP
import datetime
from .user import User

class Toot(db.Model):
    __tablename__ = 'toots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    author_id = db.Column(db.Integer, db.ForeignKey(User.id))
    author = db.relationship('User', backref='toots')

    parent_id = db.Column(db.Integer, db.ForeignKey(id))
    children = db.relationship('Toot', backref=db.backref('parent', remote_side=[id]))

    text = db.Column(db.String(280), nullable=False)
    time = db.Column(TIMESTAMP,default=datetime.datetime.utcnow)
    views = db.Column(db.Integer, default=0)
    # likes = db.Column(db.Integer, default=0)


    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'author': self.author.to_dict(),
            'text': self.text,
            'parent_id': self.parent_id,
            'time': self.time,
            'reply_count': len(self.replies()),
            'views': self.views,
            # 'likes': self.likes,
            'likes': self.like_list(),
            'tags': self.tags(),
            'mentions': self.mentions(),
            'parent_author': self.parent_author(),
        }
    
    def replies(self):
        if not self.children: return []
        return [c.to_dict() for c in self.children]
    
    def tags(self):
        res=[]
        words = self.text.split(' ')
        for word in words:
            if word and word[0]=='#':
                res.append(word[1:].lower())
        return res
    
    def mentions(self):
        res=[]
        words = self.text.split(' ')
        for word in words:
            if word and word[0]=='@':
                res.append(word[1:])
        return res
    
    def parent_author(self):
        if not self.parent_id: return None
        parent = User.query.get(self.parent_id)
        return parent.to_dict()
    
    def like_list(self):
        return [like.to_dict() for like in self.likes]