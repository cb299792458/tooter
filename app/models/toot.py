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
    likes = db.Column(db.Integer, default=0)


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
            'likes': self.likes,
            # 'replies': [c.to_dict() for c in self.children],
            # 'parent': self.parent.to_dict(),
        }
    
    def replies(self):
        if not self.children: return []
        return [c.to_dict() for c in self.children]