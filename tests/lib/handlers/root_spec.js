/* eslint-env mocha */
import { expect } from 'chai';
import Hapi from 'hapi';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Layout from '../../../lib/views/layout';
import RootHandler from '../../../lib/handlers/root';


const internals = {};


describe('Root handling', () => {

    it('returns 200 reps and calls root.handler from the \'/\' path', (done) => {

        const request = {
            method: 'GET',
            url: '/test'
        };

        internals.server.init((err, server) => {

            expect(err).to.not.exist;

            server.route({
                method: 'GET',
                path: '/test',
                config: RootHandler.Root
            });

            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.payload).to.equal(
                    `<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(<Layout clientScript="app.bundle.js" />)}`
                );

                server.stop(done);
            });
        });
    });
});


internals.server = {
    init: (next) => {

        const server = new Hapi.Server();

        server.connection({ port: 0 });
        server.start((err) => next(err, server));
    }
};
