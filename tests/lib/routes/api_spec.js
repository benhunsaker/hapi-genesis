/* eslint-env mocha */
import { expect } from 'chai';
import Hapi from 'hapi';
import Inert from 'inert';
import Sinon from 'sinon';

import MongoConfig from '../../../lib/plugins/mongoConfig';
import APIHandler from '../../../lib/handlers/api';
import APIRoutes from '../../../lib/routes/api';


const internals = {};


describe('API routing', () => {

    let createSpy;
    let deleteSpy;
    let getAllSpy;
    let getSpy;
    let updateSpy;
    let serverPointer;

    before((done) => {

        getAllSpy = Sinon.stub(APIHandler.GetAll, 'handler').callsFake((req, reply) => reply(200));
        getSpy = Sinon.stub(APIHandler.Get, 'handler').callsFake((req, reply) => reply(200));
        createSpy = Sinon.stub(APIHandler.Create, 'handler').callsFake((req, reply) => reply(200));
        updateSpy = Sinon.stub(APIHandler.Update, 'handler').callsFake((req, reply) => reply(200));
        deleteSpy = Sinon.stub(APIHandler.Delete, 'handler').callsFake((req, reply) => reply(200));

        internals.server.init((err, server) => {

            if (err) return err; //eslint-disable-line curly

            serverPointer = server;
            done();
        });
    });

    after(() => {

        getAllSpy.restore();
        getSpy.restore();
        createSpy.restore();
        updateSpy.restore();
        deleteSpy.restore();

        serverPointer.stop();
    });

    it('returns 200 statusCode and calls api.GetAll from the \'/api/tournaments\' path', (done) => {

        const request = {
            method: 'GET',
            url: '/api/tournaments'
        };

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.not.equal(404);
            expect(getAllSpy.called).to.be.true;
            done();
        });
    });

    it('returns 200 statusCode and calls api.create from the \'/api/tournaments\' path', (done) => {

        const request = {
            method: 'POST',
            url: '/api/tournaments',
            payload: { test: 'test' }
        };

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.not.equal(404);
            expect(createSpy.called).to.be.true;
            done();
        });
    });

    it('returns 200 statusCode and calls api.Get from the \'/api/tournaments/1\' path', (done) => {

        const request = {
            method: 'GET',
            url: '/api/tournaments/123456789012'
        };

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.not.equal(404);
            expect(getSpy.called).to.be.true;
            done();
        });
    });

    it('returns 200 statusCode and calls api.Update from the \'/api/tournament/1\' path', (done) => {

        const request = {
            method: 'PUT',
            url: '/api/tournaments/123456789012',
            payload: { test: 'updated test' }
        };

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.not.equal(404);
            expect(updateSpy.called).to.be.true;
            done();
        });
    });

    it('returns 200 statusCode and calls api.Delete from the \'/api/tournament/1\' path', (done) => {

        const request = {
            method: 'DELETE',
            url: '/api/tournaments/123456789012'
        };

        serverPointer.inject(request, (res) => {

            expect(res.statusCode, 'Status Code').to.not.equal(404);
            expect(deleteSpy.called).to.be.true;
            done();
        });
    });
});

internals.plugins = [MongoConfig, Inert, APIRoutes];

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
