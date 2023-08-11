from flask import Blueprint, request
from app.models import db, Like, User, Toot

like_routes = Blueprint('likes', __name__)


@like_routes.route('/')
def likes():
    likes = Like.query.all()
    return [like.to_dict() for like in likes]

@like_routes.route('/<int:id>')
def like(id):
    like = Like.query.get(id)
    return like.to_dict()

@like_routes.route('toggle', methods=['POST'])
def toggle():
    data = request.json
    # user = User.query.get(data['liker_id'])
    # toot = Toot.query.get(data['liked_toot_id'])

    like = Like.query.filter_by(liker_id=data['liker_id'],liked_toot_id=data['liked_toot_id']).one_or_none()
    if like:
        # like.delete()
        db.session.delete(like)
        db.session.commit()
        return {'ok': True, 'change': -1} # change isn't working
    else:
        like = Like(liker_id = data['liker_id'], liked_toot_id = data['liked_toot_id'])
        db.session.add(like)
        db.session.commit()
        return {'ok': True, 'change': 1} # change isn't working



# Future Routes?
# /user/<int:id> gets all likes by user
# /toot/<int:id> gets all likes on toot