from .db import db, environment, SCHEMA


class Toot(db.Model):
    __tablename__ = 'toots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author = db.relationship('User', backref='toots')

    parent_id = db.Column(db.Integer, db.ForeignKey('toots.id'))
    children = db.relationship('Toot', backref=db.backref('parent', remote_side=[id]))

    text = db.Column(db.String(280), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'author': self.author.to_dict(),
            'text': self.text,
            'parent_id': self.parent_id,
            # 'parent': self.parent.to_dict(),
        }