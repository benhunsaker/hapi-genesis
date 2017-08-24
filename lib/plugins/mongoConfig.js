import Config from '../../configs/general';


const internals = {};


const register = function (server, options, next) {

    server.register({
        register: require('hapi-mongodb'),
        options: internals.options
    }, (err) => {

        if (err) return next(err); //eslint-disable-line curly
        return next();
    });
};

register.attributes = { name: 'Mongo Config' };

internals.options = {
    url: `${Config.dbUrl}`,
    decorate: true
};

export default { register };
