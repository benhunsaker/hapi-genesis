import HapiMongoDB from 'hapi-mongodb';
import Hapi from 'hapi';
import { expect } from 'chai';

import MongoConfig from '../../../lib/plugins/mongoConfig';


const internals = {};
internals.plugins = [MongoConfig];
internals.server = {
    init: (next) => {

        const server = new Hapi.Server();

        server.connection({ port: 0 });

        server.register(internals.plugins, (err) => {

            if (err) return next(err); //eslint-disable-line curly

            server.start((err) => {

                return next(err, server);
            });
        });
    }
};


describe('mongodb configuration', () => {

    it('registers "hapi-mongodb"', (done) => {

        internals.server.init((err, server) => {

            expect(err).to.not.exist;
            expect(Object.keys(server.registrations)).to.include('hapi-mongodb');
            server.stop(done);
        });
    });

    it('errors on failed registering of hapi-mongodb plugin', (done) => {

        const orig = HapiMongoDB.register;

        HapiMongoDB.register = function (plugin, options, next) {

            HapiMongoDB.register = orig;
            return next(new Error('fail'));
        };

        HapiMongoDB.register.attributes = {
            name: 'fake hapi-mongodb failure'
        };

        internals.server.init((err, server) => {

            expect(err).to.exist;
            done();
        });
    });
});
