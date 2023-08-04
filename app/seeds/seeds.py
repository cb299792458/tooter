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
    ('demo_user','Demosthenes','demo@aa.io','password',''),
    ('the_frizz','Valerie Frizzle, PhD','vfrizzle@walkerville.edu','password',''),
    ('wevebeenfrizzled','Timothy "Tim" Wright','tim@walkerville.edu','password',''),
    ('shouldvestayedhometoday','Arnold Perlstein','arnold@walkerville.edu','password',''),
    ('punderdog','Carlos Ramon','carlos@walkerville.edu','password',''),
    ('atmyoldschool','Phoebe Terese','phoebe@walkerville.edu','password',''),
    ('ohbadohbad','Keesha Franklin','keesha@walkerville.edu','password',''),
    ('accordingtomyresearch','Dorothy Ann "D.A" Hudson','da@walkerville.edu','password',''),
    ('isitjustme','Ralph Alessandro Giuseppe "Ralphie" Tennelli','ralphie@walkerville.edu','password',''),
    ('whatarewegonnado','Wanda Li','wanda@walkerville.edu','password',''),
]


def reset_all():
    db.drop_all()
    db.create_all()

    users=[]
    for (username,name,email,password,picture) in user_data:
        new_user=User(username=username,name=name,email=email,password=password,picture=picture)
        db.session.add(new_user)
        users.append(new_user)

    t1 = Toot(text='this is a toot')
    db.session.add(t1)
    
    for user in users:
        if user==users[1]: continue
        users[1].followers.append(user)

    db.session.commit()