import Hapi from 'hapi';
import Path from 'path';


const internals = {};
internals.plugins = [
    require('inert'),
    require('./plugins/goodConfig'),
    require('./plugins/mongoConfig'),
    require('./routes/api'),
    require('./routes/root')
];


const init = (port, next) => {

    const server = new Hapi.Server();

    server.connection({ port });

    server.register(internals.plugins, (err) => {

        if (err) return next(err); // eslint-disable-line curly

        // static dist routing
        server.route({
            method: 'GET',
            path: '/{path*}',
            config: {
                description: 'Static file routing',
                handler: {
                    directory: {
                        path: Path.join(__dirname, '..', 'dist', 'static'),
                        index: false,
                        redirectToSlash: false,
                        lookupCompressed: true
                    }
                },
                cache: {
                    expiresIn: 24 * 60 * 60 * 1000,
                    privacy: 'public'
                }
            }
        });

        server.start((err) => next(err, server));
    });
};

export default { init };
