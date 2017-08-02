import { GetAll, Get, Create, Update, Delete } from '../handlers/api';


const internals = {};


const register = function (server, options, next) {

    server.dependency(['inert'], internals.after);

    return next();
};

register.attributes = { name: 'API Routing' };

internals.after = (server, next) => {

    server.route({ method: 'GET', path: '/api/tournaments', config: GetAll });
    server.route({ method: 'POST', path: '/api/tournaments', config: Create });
    server.route({ method: 'GET', path: '/api/tournaments/:id', config: Get });
    server.route({ method: 'PUT', path: '/api/tournaments/:id', config: Update });
    server.route({ method: 'DELETE', path: '/api/tournaments/:id', config: Delete });

    return next();
};

export default { register };
