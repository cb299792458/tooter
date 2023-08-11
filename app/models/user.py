from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    picture = db.Column(db.String(255), default="https://i.imgur.com/dQ3K4BM.jpg")

    follows = db.Table('follows',
        db.Column('follower_id', db.Integer, db.ForeignKey(id), primary_key=True),
        db.Column('followee_id', db.Integer, db.ForeignKey(id), primary_key=True)
    )

    followers = db.relationship('User', secondary='follows',
                               primaryjoin=(id == db.Table('follows').c.follower_id),
                               secondaryjoin=(id == db.Table('follows').c.followee_id),
                               backref=db.backref('followees',lazy='dynamic'))


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'email': self.email,
            'picture': self.picture,
            'followees': [f.id for f in self.followees],
            'followers': [f.id for f in self.followers],
        }

