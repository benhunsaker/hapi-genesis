'use strict';

import Hoek from 'hoek';

import Server from './server';
import { port } from '../configs/general';


const internals = {};
internals.server = { port };


Server.init(internals.server.port, (err, server) => {

    Hoek.assert(!err, err);
    server.log(['info'], '==> ✅  Server is listening');
    server.log(['info'], `==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
});
