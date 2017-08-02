import Boom from 'boom';


const internals = {};


const GetAll = {
    description: 'List of all tournaments',
    handler: (request, reply) => {

        const db = request.mongo.db;

        return reply(db.collection('tournament').find().toArray());
    }
};

const Get = {
    description: 'Find one tournament',
    handler: (request, reply) => {

        const db = request.mongo.db;

        return reply(db.collection('tournament').find({ _id: request.params.id }).toArray());
    }
};

const Create = {
    description: 'Create new tournament',
    handler: (request, reply) => {

        const db = request.mongo.db;

        return reply(db.collection('tournament').find({ _id: request.params.id }).toArray());
    }
};

const Update = {
    description: 'Update a tournament',
    handler: (request, reply) => {

        const db = request.mongo.db;

        return reply(db.collection('tournament').find({ _id: request.params.id }).toArray());
    }
};

const Delete = {
    description: 'Delete a tournament',
    handler: (request, reply) => {

        const db = request.mongo.db;

        return reply(db.collection('tournament').find({ _id: request.params.id }).toArray());
    }
};

export default { GetAll, Get, Create, Update, Delete };
