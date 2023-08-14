from flask import Blueprint, jsonify, request
# from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/followers')
# @login_required
def followers(id):
    user = User.query.get(id)
    followers = user.followers
    return [f.to_dict() for f in followers]


@user_routes.route('/<int:id>/followees')
# @login_required
def followees(id):
    user = User.query.get(id)
    followees = user.followees
    return [f.to_dict() for f in followees]


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/username/<string:username>')
def user_by_username(username):
    user = User.query.filter_by(username=username).one_or_none()
    if user==None: return {'error': 'not found'}
    return user.to_dict()


@user_routes.route('/edit',methods=['PUT'])
def update():
    data=request.json
    user=User.query.get(data['id'])
    user.username = data['username']
    user.name = data['name']
    user.picture = data['picture']
    db.session.commit()
    return user.to_dict()

