var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var arrayApiRest = require('../lib/array-api-rest');

chai.use(chaiHttp);
var array = [];

var app = arrayApiRest(array);

describe('Test array-api-rest', function () {

	this.timeout(6000);

	var host = 'http://localhost:3000';

	it('Add 3 new objects', function (done) {

		chai.request(app)
			.post('/name')
			.send({id : 1, nombre : 'Luis', apellido : 'Perez'})
			.end(function (err, res) {
				if (err) {
					throw err;
				}

				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('id');
				res.body.should.have.property('nombre');
				res.body.should.have.property('apellido');
				res.body.id.should.equal(1);
				res.body.nombre.should.equal('Luis');
				res.body.apellido.should.equal('Perez');

				chai.request(app)
					.post('/name')
					.send({id : 2, nombre : 'Pedro', apellido : 'Lopez'})
					.end(function (err, res) {
						if (err) {
							throw err;
						}

						res.should.have.status(200);
						res.should.be.json;
						res.body.should.have.property('id');
						res.body.should.have.property('nombre');
						res.body.should.have.property('apellido');
						res.body.id.should.equal(2);
						res.body.nombre.should.equal('Pedro');
						res.body.apellido.should.equal('Lopez');

						chai.request(app)
							.post('/name')
							.send({id : 3, nombre : 'Raul', apellido : 'Gomez'})
							.end(function (err, res) {
								if (err) {
									throw err;
								}

								res.should.have.status(200);
								res.should.be.json;
								res.body.should.have.property('id');
								res.body.should.have.property('nombre');
								res.body.should.have.property('apellido');
								res.body.id.should.equal(3);
								res.body.nombre.should.equal('Raul');
								res.body.apellido.should.equal('Gomez');
								done();
							});
					});
			});
	});

	it('Get specific object', function (done) {

		chai.request(app)
			.get('/name/2')
			.end(function (err, res) {

				if (err) {
					throw err;
				}

				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('id');
				res.body.should.have.property('nombre');
				res.body.should.have.property('apellido');
				res.body.id.should.equal(2);
				res.body.nombre.should.equal('Pedro');
				res.body.apellido.should.equal('Lopez');
				done();
			});

	});

	it('Get a inexistent object', function (done) {

		chai.request(app)
			.get('/name/22')
			.end(function (err, res) {

				if (err) {
					throw err;
				}

				res.should.have.status(204);
				done();
			});

	});
	it('Modify a object', function (done) {

		chai.request(app)
			.put('/name/2')
			.send({id : 2, nombre : 'PedroXXX', apellido : 'LopezXXXX'})
			.end(function (err, res) {

				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('id');
				res.body.should.have.property('nombre');
				res.body.should.have.property('apellido');
				res.body.id.should.equal(2);
				res.body.nombre.should.equal('PedroXXX');
				res.body.apellido.should.equal('LopezXXXX');
				done();

			});
	});

	it('Remove object', function (done) {

		chai.request(app)
			.delete('/name/2')
			.end(function (err, res) {

				if (err) {
					throw err;
				}

				res.should.have.status(200);
				res.should.be.json;
				chai.request(app)
					.get('/name')
					.end(function(err, res) {

						res.should.have.status(200);
						res.should.be.json;
						res.body.length.should.equal(2);
						done();
					});

			});
	});

});
