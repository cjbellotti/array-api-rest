var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

function createBasicConfiguration() {

	var config = {};

	config.ID = 'id';
	config.prefix = '';
	config.sufix = '';
	config.logRequest = false;
	config.restName = 'name';
	
	return config;

}

function generate (array, config) {

	var app = new express();
	app.restifyConfig = {};

	if (config) {
		
		app.restifyConfig.ID = config.ID || 'id';
		app.restifyConfig.prefix = config.prefix || '';
		app.restifyConfig.sufix = config.sufix || '';
		app.restifyConfig.logRequest = config.logRequest || false;
		app.restifyConfig.restName = config.restName || 'name';

	} else {

		app.restifyConfig = createBasicConfiguration();

	}

	app.restifyConfig.array = array;


	if (app.restifyConfig.logRequest) {

		app.use(function (req, res, next) {
			
			console.log('%s - %s', req.method, req.url);

		});

	}

	app.use(bodyParser.urlencoded({ extended : false }));
	app.use(bodyParser.json());

	var url = '/' + ((app.restifyConfig.prefix != '') ? app.restifyConfig.prefix + '/' : '');
	url += app.restifyConfig.restName;
	url += ((app.restifyConfig.sufix != '') ? app.restifyConfig.sufix : '');

	console.log('Publishing GET - %s...', url);
	app.get(url, function (req, res) {
		res.json(app.restifyConfig.array);
	});

	console.log('Publishing POST - %s...', url);
	app.post(url, function (req, res) {
	
		var findInfo = {};
		findInfo[app.restifyConfig.ID] = req.body[app.restifyConfig.ID];

		var index = _.findIndex(app.restifyConfig.array, findInfo);

		if (index < 0) {

			app.restifyConfig.array.push(req.body);
			res.json(req.body);

		} else {

			res.status(500).json({ err : 'ID already exists'});
		}	
	});


	url += '/:id';
	console.log('Publishing GET - %s...', url);
	app.get(url, function (req, res) {

		var findInfo = {};
		findInfo[app.restifyConfig.ID] = parseInt(req.params.id);

		var index = _.findIndex(app.restifyConfig.array, findInfo);

		if (index >= 0) {

			res.json(app.restifyConfig.array[index]);

		} else {

			res.status(204).json({ err : 'ID not exists'});
		}

	});

	console.log('Publishing PUT - %s...', url);
	app.put(url, function (req, res) {

		var findInfo = {};
		findInfo[app.restifyConfig.ID] = parseInt(req.params.id);

		var index = _.findIndex(app.restifyConfig.array, findInfo);

		if (index >= 0) {

			app.restifyConfig.array[index] = req.body;
			res.json(app.restifyConfig.array[index]);

		} else {

			res.status(204).json({ err : 'ID not exists'});
		}

	});

	console.log('Publishing DELETE - %s...', url);
	app.delete(url, function (req, res) {

		var findInfo = {};
		findInfo[app.restifyConfig.ID] = parseInt(req.params.id);

		var index = _.findIndex(app.restifyConfig.array, findInfo);

		if (index >= 0) {

			var toRemove = app.restifyConfig.array[index];
			app.restifyConfig.array = _.without(app.restifyConfig.array, toRemove);
			res.json({});

		} else {

			res.status(204).json({ err : 'ID not exists'});
		}

	});

	return app;
		
}

module.exports = generate;


