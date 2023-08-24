from flask import Blueprint, request, jsonify
from app.models import db, Message

message_routes = Blueprint('messages', __name__)


@message_routes.route('/')
def messages():
    messages = Message.query.all()
    return [m.to_dict() for m in messages]


@message_routes.route('/new', methods=['POST'])
def write():
    data=request.json

    message = Message(text=data['text'],
                      sender_id=data['sender_id'],
                      receiver_id=data['receiver_id'])
    db.session.add(message)
    db.session.commit()

    return jsonify(message.to_dict())