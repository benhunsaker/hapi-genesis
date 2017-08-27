/* eslint-env mocha */
import { expect } from 'chai';
import Hapi from 'hapi';
import Sinon from 'sinon';

import RootHandler from '../../../lib/handlers/root';
import RootRoute from '../../../lib/routes/root';


const internals = {};


describe('Root routing', () => {

    it('returns 200 reps and calls root.handler from the \'/\' path', (done) => {

        const rootHanlderSpy = Sinon.spy(RootHandler.Root, 'handler');

        internals.server.init((err, server) => {

            expect(err).to.not.exist;

            const request = {
                method: 'GET',
                url: '/'
            };

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.not.equal(404);
                expect(rootHanlderSpy.called).to.be.true;

                rootHanlderSpy.reset();

                server.stop(done);
            });
        });
    });
});

internals.plugins = [RootRoute];

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
