from flask import Blueprint, request
from app.models import db,User

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/',methods=['POST'])
def toggle():
    data=request.json
    follower = User.query.get(data['follower'])
    followee = User.query.get(data['followee'])

    if follower in followee.followers:
        followee.followers.remove(follower)
    else:
        followee.followers.append(follower)

    db.session.commit()
    return {'ok': True}