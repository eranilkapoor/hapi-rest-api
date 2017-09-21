'use strict';

const UsersModel = require('../models/users');
const usersModel = new UsersModel();

function UsersController(){};

/* Get All Users */
UsersController.prototype.index = function(request, reply) { 
    usersModel.getAllUsers(request, reply);
};

/* Get Single User */
UsersController.prototype.show = function(request, reply) { 
    usersModel.getUser(request, reply);
};

/* Add Single User */
UsersController.prototype.store = function(request, reply) { 
    usersModel.addUser(request, reply);
};

/* Update Single User */
UsersController.prototype.update = function(request, reply) { 
    usersModel.updateUser(request, reply);
};

/* Delete Single User */
UsersController.prototype.destroy = function(request, reply) { 
    usersModel.destroyUser(request, reply);
};

module.exports = UsersController;