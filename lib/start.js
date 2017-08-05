import Server from './server';
import { port } from '../configs/general';


const internals = {};
internals.server = { port };


Server.init(internals.server.port, (err, server) => {

    if (err) return next(err); //eslint-disable-line curly
    server.log(['info'], '==> ✅  Server is listening');
    server.log(['info'], `==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
});
