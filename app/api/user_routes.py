from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    followers = user.followers
    return [f.to_dict() for f in followers]


@user_routes.route('/<int:id>/followees')
# @login_required
def followees(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
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