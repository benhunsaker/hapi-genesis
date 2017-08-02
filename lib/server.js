import Hapi from 'hapi';
import Hoek from 'hoek';


const internals = {};

internals.plugins = [
    require('inert'),
    require('./plugins/goodConfig'),
    require('./plugins/mongoConfig'),
    require('./routes/api')
];

const init = (port, next) => {

    const server = new Hapi.Server();

    server.connection({ port });

    server.register(internals.plugins, (err) => {

        Hoek.assert(!err, err);

        server.start((err) => {

            return next(err, server);
        });
    });
};

export default { init };
