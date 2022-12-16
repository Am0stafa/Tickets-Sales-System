process.env.NODE_ENV = 'test';

var request = require('supertest');
var xpect = require('chai').expect;
var express = require('express');
var app = express();
var sqlinjection = require('../lib/index');

describe('basic tests', function() {

    it('returns function', function(done) {

        xpect(sqlinjection).to.be.a('function');
        done();
    });
});

describe('supertests', function() {

    before(function(done) {

        app.use(sqlinjection);
        app.get('/test', function(req, res) {
            res.status(200).send({});
        });
        app.get('/users/:uid', function(req, res) {
            res.status(200).send({});
        });
        app.post('/body', function(req, res) {
            res.status(200).send({});
        });
        done();
    });

    after(function(done) {
        done();
    });

    it('can call app', function(done) {

        request(app).get('/test').expect(200, done);
    });

    it('querystring no sql', function(done) {

        request(app).get('/test?attack=noattack').expect(200, done);
    });

    it('param no sql', function(done) {

        request(app).get('/users/1').expect(200, done);
    });

    it('body no sql', function(done) {

        request(app).post('/body').send({
            stuff: 'somestuff'
        }).expect(200, done);
    });

    it('querystring with sql', function(done) {

        request(app).get('/test?attack=' + escape('WHERE field = \'anything\' OR \'x\'=\'x\'\'')).expect(403, done);
    });

    it('param with sql', function(done) {

        request(app).get('/users/' + escape('WHERE field = \'anything\' OR \'x\'=\'x\'\'')).expect(403, done);
    });

    it('body with sql', function(done) {

        request(app).post('/body').send({
            stuff: 'WHERE field = \'anything\' OR \'x\'=\'x\'\''
        }).expect(403, done);
    });
});
