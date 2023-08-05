from flask import Blueprint, jsonify, request
from app.models import db, Toot, User

toot_routes = Blueprint('toots', __name__)


@toot_routes.route('/')
def toots():
    toots = Toot.query.all()
    return [toot.to_dict() for toot in toots]

@toot_routes.route('/new',methods=['POST'])
def create_toot():
    data=request.json

    toot = Toot(text=data['text'],author_id=data['author_id'])
    db.session.add(toot)
    db.session.commit()
    
    return jsonify(toot.to_dict())


@toot_routes.route('/<int:id>')
def toot(id):
    toot = Toot.query.get(id)
    return toot.to_dict()