/* eslint-env mocha */

import { expect } from 'chai';
import Hapi from 'hapi';
import Inert from 'inert';

import MongoConfig from '../../../lib/plugins/mongoConfig';
import APIHandler from '../../../lib/handlers/api';


const internals = {};


describe('API handlers', () => {

    let serverPointer;

    before((done) => {

        internals.server.init((err, server) => {

            if (err) return err; //eslint-disable-line curly

            serverPointer = server;
            done();
        });
    });

    after(() => {

        serverPointer.stop();
    });

    it('returns 200 statusCode and calls api.GetAll from the \'/api/tournaments\' path', (done) => {

        const request = {
            method: 'GET',
            url: '/test'
        };

        serverPointer.route({
            method: request.method,
            path: request.url,
            config: APIHandler.GetAll
        });

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.equal(200);
            expect(res.result).to.have.lengthOf(0);
            done();
        });
    });

    it('returns 200 statusCode and calls api.create from the \'/api/tournaments\' path', (done) => {

        const request = {
            method: 'POST',
            url: '/test',
            payload: { test: 'test' }
        };

        serverPointer.route({
            method: request.method,
            path: request.url,
            config: APIHandler.Create
        });

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.equal(200);
            expect(res.result.test).to.equal(request.payload.test);
            expect(res.result._id).to.not.be.empty;

            const db = serverPointer.mongo.db;
            const ObjectID = serverPointer.mongo.ObjectID;

            db.collection('model').remove({ _id: new ObjectID(res.result._id) }, done);
        });
    });

    it('returns 200 statusCode and calls api.Get from the \'/api/tournaments/:id\' path', (done) => {

        const testPayload = { test: 'test' };
        serverPointer.mongo.db.collection('model').insert(testPayload, (err, result) => {

            const newDoc = result.ops[0];
            expect(err).to.be.null;
            expect(newDoc.test).to.equal(testPayload.test);

            const request = {
                method: 'GET',
                url: `/test/${newDoc._id}`
            };

            serverPointer.route({
                method: request.method,
                path: '/test/{id}',
                config: APIHandler.Get
            });

            serverPointer.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result).to.eql(newDoc);

                const db = serverPointer.mongo.db;
                const ObjectID = serverPointer.mongo.ObjectID;

                db.collection('model').remove({ _id: new ObjectID(newDoc._id) }, done);
            });
        });
    });

    it('returns 200 statusCode and calls api.Update from the \'/api/tournament/:id\' path', (done) => {

        const testPayload = { test: 'test' };
        serverPointer.mongo.db.collection('model').insert(testPayload, (err, result) => {

            const newDoc = result.ops[0];
            expect(err).to.be.null;
            expect(newDoc.test).to.equal(testPayload.test);

            const request = {
                method: 'PUT',
                url: `/test/${newDoc._id}`,
                payload: { test: 'updatedtest' }
            };

            serverPointer.route({
                method: request.method,
                path: '/test/{id}',
                config: APIHandler.Update
            });

            serverPointer.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result.test).to.equal(request.payload.test);
                expect(res.result._id).to.eql(newDoc._id);

                const db = serverPointer.mongo.db;
                const ObjectID = serverPointer.mongo.ObjectID;

                db.collection('model').remove({ _id: new ObjectID(newDoc._id) }, done);
            });
        });
    });

    it('returns 200 statusCode and calls api.Delete from the \'/api/tournament/1\' path', (done) => {

        const testPayload = { test: 'test' };
        serverPointer.mongo.db.collection('model').insert(testPayload, (err, result) => {

            const newDoc = result.ops[0];
            expect(err).to.be.null;
            expect(newDoc.test).to.equal(testPayload.test);

            const request = {
                method: 'DELETE',
                url: `/test/${newDoc._id}`,
                payload: { test: 'updatedtest' }
            };

            serverPointer.route({
                method: request.method,
                path: '/test/{id}',
                config: APIHandler.Delete
            });

            serverPointer.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);

                const db = serverPointer.mongo.db;
                const ObjectID = serverPointer.mongo.ObjectID;

                db.collection('model').findOne({ _id: new ObjectID(newDoc._id) }, (err, result2) => {

                    expect(err).to.be.null;
                    expect(result2).to.be.null;
                    done();
                });
            });
        });
    });
});

internals.plugins = [MongoConfig, Inert];

internals.server = {
    init: (next) => {

        const server = new Hapi.Server();

        server.connection({ port: 0 });

        server.register(internals.plugins, (err) => {

            if (err) return next(err); //eslint-disable-line curly

            server.start((err) => next(err, server));
        });
    }
};
