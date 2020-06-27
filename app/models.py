from . import db
from datetime import datetime

class Visitor(db.Model):
	__tablename__='visitors'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(64))
	email = db.Column(db.String(64))
	person_visited = db.Column(db.String(64))
	entry_time = db.Column(db.DateTime(), default=datetime.utcnow)
	exit_time = db.Column(db.DateTime())
	is_out = db.Column(db.Boolean, default=False)