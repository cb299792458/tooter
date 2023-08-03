from .db import db, environment, SCHEMA, add_prefix_for_prod


class Toot(db.Model):
    __tablename__ = 'toots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(280), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
        }