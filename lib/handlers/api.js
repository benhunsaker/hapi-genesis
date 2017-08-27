// import Boom from 'boom';

import Boom from 'boom';

const internals = {
    ErrorMessage: 'Internal MongoDB error'
};


const GetAll = {
    description: 'List of all of models',
    handler: (req, reply) => {

        req.mongo.db.collection('model').find().toArray((err, records) => {

            if (err) return reply(Boom.internal(internals.ErrorMessage, err)); //eslint-disable-line curly
            reply(records);
        });
    }
};

const Create = {
    description: 'Create new tournament',
    handler: (req, reply) => {

        req.mongo.db.collection('model').insert(req.payload, (err, result) => {

            if (err) return reply(Boom.internal(internals.ErrorMessage, err)); //eslint-disable-line curly
            reply(result.ops[0]);
        });
    }
};

const Get = {
    description: 'Find one model',
    handler: (req, reply) => {

        const db = req.mongo.db;
        const ObjectID = req.mongo.ObjectID;

        db.collection('model').findOne({ _id: new ObjectID(req.params.id) }, (err, result) => {

            if (err) return reply(Boom.internal(internals.ErrorMessage, err)); //eslint-disable-line curly
            reply(result);
        });
    }
};

const Update = {
    description: 'Update a tournament',
    handler: (req, reply) => {

        const db = req.mongo.db;
        const ObjectID = req.mongo.ObjectID;

        db.collection('model').update({ _id: new ObjectID(req.params.id) }, req.payload, (err, result) => {

            if (err) return reply(Boom.internal(internals.ErrorMessage, err)); //eslint-disable-line curly

            db.collection('model').findOne({ _id: new ObjectID(req.params.id) }, (err2, result2) => {

                if (err2) return reply(Boom.internal(internals.ErrorMessage, err2)); //eslint-disable-line curly
                reply(result2);
            });
        });
    }
};

const Delete = {
    description: 'Delete a tournament',
    handler: (req, reply) => {

        const db = req.mongo.db;
        const ObjectID = req.mongo.ObjectID;

        db.collection('model').remove({ _id: new ObjectID(req.params.id) }, (err, result) => {

            if (err) return reply(Boom.internal(internals.ErrorMessage, err)); //eslint-disable-line curly
            reply(result.result);
        });
    }
};

export default { GetAll, Get, Create, Update, Delete };
