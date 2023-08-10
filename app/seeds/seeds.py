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
    ('shouldhavestayedhometoday','Arnold Perlstein','arnold@walkerville.edu','password','https://i.imgur.com/r594tQJ.png'),
    ('wevebeenfrizzled','Timothy "Tim" Wright','tim@walkerville.edu','password','https://i.imgur.com/JO6jL5R.png'),
    ('punderdog','Carlos Ramon','carlos@walkerville.edu','password','https://i.imgur.com/KnfT5rp.png'),
    ('atmyoldschool','Phoebe Terese','phoebe@walkerville.edu','password','https://i.imgur.com/AqnHCDo.png'),
    ('ohbadohbad','Keesha Franklin','keesha@walkerville.edu','password','https://i.imgur.com/c41GFC0.png'),
    ('accordingtomyresearch','Dorothy Ann "D.A" Hudson','da@walkerville.edu','password','https://i.imgur.com/qPjJccl.png'),
    ('isitjustme','Ralph Alessandro Giuseppe "Ralphie" Tennelli','ralphie@walkerville.edu','password','https://i.imgur.com/Oa9skL9.png'),
    ('whatarewegonnado','Wanda Li','wanda@walkerville.edu','password','https://i.imgur.com/u8MPGlJ.png'),
    ('ohcaptainmycaptain','John Keating','keating@welton.edu','password','https://i.imgur.com/ecx4XXw.png'),
    ('heisenberg','Walter White','white@albuquerque.edu','password','https://i.imgur.com/jGVjRZd.png'),
    ('khanacademy','Salman "Sal" Khan','sal@khanacademy.org','password','https://i.imgur.com/qxhd9kq.png'),
    ('crashcourse', 'John and Hank Green', 'bros@crashcourse.com', 'password', 'https://i.imgur.com/5QoMvWF.png'),
    ('no_to_violence', 'Hanan Al Hroub', 'hanan@hroub.com', 'password', 'https://imgur.com/wJMcEwt.png'),
    ('stand_and_deliver', 'Jaime Escalante', 'jaime@eastla.edu', 'password', 'https://imgur.com/iydAx0a.png'),
    ('brian', 'Brian Lam', 'brianrlam@gmail.com', 'wordpass', 'https://imgur.com/NQamtCn.png'),
]
toot_data=[
    (0,None,"""Seatbelts everyone! We\'re going on a #FieldTrip today!
    It\'s time to take chances! Make mistakes! Get messy!
    @shouldhavestayedhometoday @wevebeenfrizzled @punderdog @atmyoldschool @ohbadohbad @accordingtomyresearch @isitjustme @whatarewegonnado"""),
    (2,0,'Please let this be a normal #FieldTrip.'),
    (5,0,'Awesome! At my old school, we almost never went on field trips.'),
    (6,None,'Oh bad! Oh bad! Oh bad bad bad! The big #algebra test is tomorrow, and I haven\'t studied at all!'),
    (9,3,'What are we gonna do? Can anyone help us study after school today? #tootee'),
    (12,3,'Sure I can help with #algebra. I just sent DMs to both of you. #tooter'),
    (8,None,'Is it just me, or is this #chemistry lab impossible? I just don\'t get it at all. #tootee'),
    (11,6,'I\'m a #chemistry teacher, and I\'d be happy to help you out! I have an RV in the desert where I do lots of cool experiments. #tooter'),
    (7,6,'According to my research, Mr. White\'s experiments aren\'t quite what we usually do in Ms. Frizzle\'s class. Be careful @isitjustme! #review'),
    (10,None,'Hi, I\'m Mr. Keating, and I\'m offering afforable tutoring in reading, writing, grammar, and spelling. Follow me for more info. #english #tooter'),
    (4,9,'I can vouch for Mr. Keating. Thanks @ohcaptainmycaptain for teaching me the meaning of the word "many". It means a lot! #pun #review'),
    (3,10,"*groans* CARLOS! But seriously though, Mr. Keating is an amazing #english #tooter. #review"),
    (13,None,'Hey, Hank and John here! While Tootr makes it easy for any #tootee to find a greate #tooter online, Crash Course is also a great resource. Don\'t forget to be awesome!'),
    (15,12,'For all my students taking AP Calculus next year, @crashcourse is a great resource to help you prepare over the summer. #review'),
    (14,None,'Hi Tootr, My name is Hanan Hroub, 2016 winner of the Global Teacher Prize. I specialize in teaching refugee children who have been displaced by violence. #tooter'),
    (13,14,'Thank you so much @no_to_violence. You\'re an inspiration!')

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
    for user in users[10:]:
        users[1].followers.append(user)
    for a in range(2,10):
        for b in range(2,10):
            if a!=b:
                users[a].followers.append(users[b])

    toots=[]
    for (author_idx,parent,text) in toot_data:
        new_toot=Toot(author=users[author_idx],parent=toots[parent] if parent!=None else None,text=text)
        toots.append(new_toot)
    
    db.session.add_all(users)
    db.session.add_all(toots)

    db.session.commit()