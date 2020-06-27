from datetime import datetime
from flask import render_template, session, redirect, url_for, request, flash, jsonify
from . import main
from app.models import Visitor
from app import db



@main.route('/', methods=['GET', 'POST'])
def index():
	return render_template('index.html')


@main.route('/entrance', methods=['GET', 'POST'])
def entrance():
	name = request.form.get('name')
	email = request.form.get('email')
	person_visited = request.form.get('person_visited')

	try:
		visitor = Visitor(name=name, email=email, person_visited=person_visited)
		db.session.add(visitor)

		flash('Value successfully recorded')

	except Exception as e:
		print(e)
		flash('Value was not recorded, there is something wrong with the entered values')

	return redirect(url_for('.index'))

@main.route('/entries/actives', methods=['GET', 'POST'])
def actives_entries():
	actives_entries = Visitor.query.filter_by(is_out=False).all()
	for visitor in actives_entries:
		print(visitor.name)

	return render_template('actives_entries.html', actives_entries=actives_entries)


@main.route('/entries/all', methods=['GET', 'POST'])
def all_entries():
	if request.method == 'GET':
		all_entries = Visitor.query.all()
		for visitor in all_entries:
			print(visitor.name)

		return render_template('all_entries.html', all_entries=all_entries)


@main.route('/exit', methods=['POST'])
def exit():
	visitor_id = request.form.get('id')
	visitor = Visitor.query.filter_by(id=visitor_id).first()
	if(visitor.is_out):
		return jsonify({'visitor_already_out': True})
	visitor.is_out = True
	visitor.exit_time = datetime.utcnow()
	db.session.add(visitor)

	return jsonify({"exit": True, "visitor_out": True})


@main.route('/search', methods=['POST'])
def search():
	visitor_name = request.form.get('visitor_name')
	visitor = Visitor.query.filter_by(name=visitor_name).first()
	if visitor is None:
		return jsonify({"visitor_exist": False, "message": "No such a visitor in the databse"})
	print(visitor)
	return jsonify({"visitor_exist": True, "visitor_id": visitor.id, "visitor_name": visitor.name, "visitor_email": visitor.email, "visitor_person_visted": visitor.person_visited, "visitor_entry_time": visitor.entry_time, "visitor_exit_time": visitor.exit_time, "visitor_is_out": visitor.is_out, })