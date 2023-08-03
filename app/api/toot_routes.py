from flask import Blueprint, jsonify
from app.models import Toot

toot_routes = Blueprint('toots', __name__)


@toot_routes.route('/')
def toot():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    toots = Toot.query.all()
    return {'toot': [toot.to_dict() for toot in toots]}


# @user_routes.route('/<int:id>')
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()