import Hoek from 'hoek';
import Config from '../../configs/general';


const internals = {};


const register = function (server, options, next) {

    server.register({
        register: require('hapi-mongodb'),
        options: internals.options
    }, (err) => {

        Hoek.assert(!err, err);
        return next();
    });
};

register.attributes = { name: 'Mongo Config' };

internals.options = {
    url: `${Config.dbUrl}/nerdlucks`,
    decorate: true
};

export default { register };
