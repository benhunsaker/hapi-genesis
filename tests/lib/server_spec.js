import Hapi from 'hapi';
import Path from 'path';
import FS from 'fs';
import { expect } from 'chai';

import Server from '../../lib/server';


const internals = {};
internals.plugins = [
    require('inert'),
    require('../../lib/plugins/goodConfig'),
    require('../../lib/plugins/mongoConfig'),
    require('../../lib/routes/api'),
    require('../../lib/routes/root')
];
internals.server = { port: 9999 };


describe('Server', () => {

    it('starts and returns a hapi server object', (done) => {

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.be.undefined;
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts on the port provided', (done) => {

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.be.undefined;
            expect(server.info.port).to.equal(internals.server.port);

            server.stop(done);
        });
    });

    it('handles register plugin errors', (done) => {

        const errorMessage = 'register plugin failed';
        const Plugin = internals.plugins[internals.plugins.length - 1];
        const original = Plugin.register;

        Plugin.register = function (server, options, next) {

            Plugin.register = original;
            return next(new Error(errorMessage));
        };

        Plugin.register.attributes = {
            name: 'faux plugin'
        };

        Server.init(internals.server.port, (err, server) => {

            expect(err).to.not.be.undefined;
            expect(err.message).to.equal(errorMessage);

            done();
        });
    });

    it('includes all necessary plugin and routes', (done) => {

        Server.init(internals.server.port, (err, server) => {

            const registeredPlugins = Object.keys(server.registrations);

            expect(err).to.be.undefined;

            internals.plugins.forEach((plugin) => {

                const name = plugin.register.attributes.name || plugin.register.attributes.pkg.name;

                expect(registeredPlugins).to.include(name);
            });

            server.stop(done);
        });
    });

    describe('sets up static routing', () => {

        let response;

        before((done) => {

            const request = {
                method: 'GET',
                url: '/css/main.css'
            };

            Server.init(internals.server.port, (err, server) => {

                if (err) {
                    return err;
                }

                server.inject(request, (res) => {

                    response = res;
                    server.stop(done);
                });
            });
        });


        it('responds with 200', () => {

            expect(response.statusCode).to.equal(200);
        });

        it('sets etag header', () => {

            expect(response.headers.etag).is.ok;
        });

        it('sets "cache-control" headers', () => {

            const cacheControlHeader = response.headers['cache-control'];
            expect(cacheControlHeader).to.contain(`max-age=${24 * 60 * 60}`);
            expect(cacheControlHeader).to.contain('public');
            expect(cacheControlHeader).to.contain('must-revalidate');
        });

        it('returns the proper file from "/css/main.css"', () => {

            const cssPath = Path.resolve(__dirname, '..', '..', 'dist', 'static', 'css', 'main.css');
            const test = FS.readFileSync(cssPath, 'utf8');
            expect(response.result).to.equal(test);
        });
    });
});
