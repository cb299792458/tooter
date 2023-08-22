from flask import Blueprint, jsonify, request
from app.models import db, Toot

toot_routes = Blueprint('toots', __name__)


@toot_routes.route('/')
def toots():
    toots = Toot.query.all()

    return [toot.to_dict() for toot in toots]

@toot_routes.route('/new',methods=['POST'])
def create_toot():
    data=request.json

    toot = Toot(text=data['text'],author_id=data['author_id'],
                parent_id=data['parent_id'] if 'parent_id' in data else None,
                original_id=data['original_id'] if 'original_id' in data else None)
    db.session.add(toot)
    db.session.commit()
    
    return jsonify(toot.to_dict())

@toot_routes.route('/<int:id>/replies')
def replies(id):
    toot = Toot.query.get(id)
    return toot.replies()

@toot_routes.route('/<int:id>', methods=['GET'])
def toot(id):
    toot = Toot.query.get(id)
    toot.views+=1
    db.session.commit()
    return toot.to_dict()

@toot_routes.route('/<int:id>', methods=['DELETE'])
def delete(id):
    toot = Toot.query.get(id)
    for child in toot.children:
        db.session.delete(child)
    for retoot in toot.retoots:
        db.session.delete(retoot)

    db.session.delete(toot)
    db.session.commit()
    return '', 200