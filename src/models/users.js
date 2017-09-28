'use strict';

const Boom = require('boom');  
const uuid = require('node-uuid');  

const mongojs = require('mongojs'); 
//const db = mongojs('HapiRESTAPI', ['users']);
const db = mongojs('mongodb://hapi-js-rest-api:Test123@ds151024.mlab.com:51024/hapi-js-rest-api', ['users']);
function UsersModel(){};

/* Get All Users */
UsersModel.prototype.getAllUsers = function(request, reply) {    
   db.users.find((err, docs) => {
        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        reply(docs);
    });
};

/* Get Single User */
UsersModel.prototype.getUser = function(request, reply) {    
   db.users.findOne({
        _id: request.params.id
    }, (err, doc) => {
        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        if (!doc) {
            return reply(Boom.notFound());
        }
        reply(doc);
    });
};

/* Add Single User */
UsersModel.prototype.addUser = function(request, reply) {    
    const user = request.payload;
    user._id = uuid.v1();

    db.users.save(user, (err, result) => {
        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        reply(user);
    });
};

/* Update Single User */
UsersModel.prototype.updateUser = function(request, reply) {    
    db.users.update({
        _id: request.params.id
    }, {
        $set: request.payload
    }, function (err, result) {
        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        if (result.n === 0) {
            return reply(Boom.notFound());
        }
        reply(result).code(200);
    });
};

/* Delete Single User */
UsersModel.prototype.destroyUser = function(request, reply) {    
    db.users.remove({
        _id: request.params.id
    }, function (err, result) {
        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        if (result.n === 0) {
            return reply(Boom.notFound());
        }
        reply(result).code(200);
    });
};

module.exports = UsersModel;
