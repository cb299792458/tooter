from .db import db, environment, SCHEMA
from .user import User
from .toot import Toot

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    liker_id = db.Column(db.Integer, db.ForeignKey(User.id))
    liker = db.relationship('User', backref='likes')

    liked_toot_id = db.Column(db.Integer, db.ForeignKey(Toot.id))
    liked_toot = db.relationship('Toot', backref='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'liker_id': self.liker_id,
            'liked_toot_id': self.liked_toot_id,
        }
    
    # def delete(self):
    #     db.session.delete