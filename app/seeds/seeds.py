from app.models import db, User, environment, SCHEMA, Toot
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demosthenes', email='demo@aa.io', password='password')
    frizz = User(
        username='the_frizz', email='vfrizzle@walkerville.edu', password='password')

    db.session.add(demo)
    db.session.add(frizz)

    t1 = Toot(text='this is a toot')
    db.session.add(t1)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()


user_data = [
    ('the_frizz','Valerie Frizzle, PhD','vfrizzle@walkerville.edu','password','https://i.imgur.com/Iy1RjQ2.png'),
    ('demo_user','Demosthenes','demo@aa.io','password','https://i.imgur.com/TF2X50m.png'),
    ('shouldvestayedhometoday','Arnold Perlstein','arnold@walkerville.edu','password','https://i.imgur.com/r594tQJ.png'),
    ('wevebeenfrizzled','Timothy "Tim" Wright','tim@walkerville.edu','password','https://i.imgur.com/JO6jL5R.png'),
    ('punderdog','Carlos Ramon','carlos@walkerville.edu','password','https://i.imgur.com/KnfT5rp.png'),
    ('atmyoldschool','Phoebe Terese','phoebe@walkerville.edu','password','https://i.imgur.com/AqnHCDo.png'),
    ('ohbadohbad','Keesha Franklin','keesha@walkerville.edu','password','https://i.imgur.com/c41GFC0.png'),
    ('accordingtomyresearch','Dorothy Ann "D.A" Hudson','da@walkerville.edu','password','https://i.imgur.com/qPjJccl.png'),
    ('isitjustme','Ralph Alessandro Giuseppe "Ralphie" Tennelli','ralphie@walkerville.edu','password','https://i.imgur.com/Oa9skL9.png'),
    ('whatarewegonnado','Wanda Li','wanda@walkerville.edu','password','https://i.imgur.com/u8MPGlJ.png'),
]
toot_data=[
    (0,None,"""Seatbelts everyone! We\'re going on a #FieldTrip today!
    It\'s time to take chances! Make mistakes! Get messy!
    @shouldvestayedhometoday @wevebeenfrizzled @punderdog @atmyoldschool @ohbadohbad @accordingtomyresearch @isitjustme @whatarewegonnado"""),
    (2,0,'I knew I should have stayed home today.')
]

def reset_all():
    db.drop_all()
    db.create_all()

    users=[]
    for (username,name,email,password,picture) in user_data:
        new_user=User(username=username,name=name,email=email,password=password,picture=picture)
        users.append(new_user)

    for user in users[1:]:
        users[0].followers.append(user)

    toots=[]
    for (author_idx,parent,text) in toot_data:
        new_toot=Toot(author=users[author_idx],parent=toots[parent] if parent!=None else None,text=text)
        toots.append(new_toot)
    
    db.session.add_all(users)
    db.session.add_all(toots)

    db.session.commit()