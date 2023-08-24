from .db import db, environment, SCHEMA
from sqlalchemy import TIMESTAMP
import datetime
from .user import User

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    sender_id = db.Column(db.Integer, db.ForeignKey(User.id))
    # sender = db.relationship('User', backref='sent_messages', foreign_keys='User.sent_message_id')

    receiver_id = db.Column(db.Integer, db.ForeignKey(User.id))
    # receiver = db.relationship('User', backref='received_messages', foreign_keys='User.received_message_id')

    text = db.Column(db.String(280), nullable=False)
    time = db.Column(TIMESTAMP,default=datetime.datetime.utcnow)
    read = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender.to_dict(),
            'receiver': self.receiver.to_dict(),
            'text': self.text,
            'time': self.time,
            'read': self.read,
        }