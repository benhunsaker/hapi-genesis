import { Root } from '../handlers/root';


const internals = {};


const register = function (server, options, next) {

    server.dependency([], internals.after);

    return next();
};

register.attributes = { name: 'Root Route' };

internals.after = (server, next) => {

    server.route({ method: 'GET', path: '/', config: Root });

    return next();
};

export default { register };
