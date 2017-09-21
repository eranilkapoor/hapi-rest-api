'use strict';

const Joi = require('joi');

const UsersController = require('../controllers/users');

exports.register = function(server, options, next) {

    var usersController = new UsersController();

    server.route({  
        method: 'GET',
        path: '/v1/users',
        handler: usersController.index,
        config: {
        	validate: {
        		headers: {
			    	'user-agent': Joi.string().required()
			    },
			    options: {
			        allowUnknown: true
			    }
        	}
        }
    });

    server.route({  
        method: 'GET',
        path: '/v1/users/{id}',
        handler: usersController.show,
        config: {
        	validate: {
        		headers: {
			    	'user-agent': Joi.string().required()
			    },
			    options: {
			        allowUnknown: true
			    },
			    params: {
                	id: Joi.string().min(3).max(100)
            	}
        	}
        }
    });

    server.route({  
        method: 'POST',
        path: '/v1/users',
        handler: usersController.store,
        config: {
            validate: {
            	headers: {
			    	'user-agent': Joi.string().required()
			    },
			    options: {
			        allowUnknown: true
			    },
                payload: {
                    first_name: Joi.string().min(3).max(50).required(),
                    last_name: Joi.string().min(3).max(50).required(),
                    email: Joi.string().email().required(),
                    phone_number: Joi.string().min(10).max(10).required(),
                    user_type: Joi.string().min(3).max(15).required(),
                    create_date: Joi.date().iso(),
                    update_date: Joi.date().iso(),
                    status: Joi.string()
                }
            }
        }
    });

    server.route({  
        method: 'PATCH',
        path: '/v1/users/{id}',
        handler: usersController.update,
        config: {
            validate: {
            	headers: {
			    	'user-agent': Joi.string().required()
			    },
			    options: {
			        allowUnknown: true
			    },
			    params: {
                	id: Joi.string().min(3).max(100)
            	},
                payload: Joi.object({
                    first_name: Joi.string().min(3).max(50).required(),
                    last_name: Joi.string().min(3).max(50).required(),
                    email: Joi.string().email().required(),
                    phone_number: Joi.string().min(10).max(10).required(),
                    user_type: Joi.string().min(3).max(15).required(),
                    create_date: Joi.date().iso(),
                    update_date: Joi.date().iso(),
                    status: Joi.string()
                }).required().min(1)
            }
        }
    });
    
    server.route({  
        method: 'DELETE',
        path: '/v1/users/{id}',
        handler: usersController.destroy,
        config: {
        	validate: {
        		headers: {
			    	'user-agent': Joi.string().required()
			    },
			    options: {
			        allowUnknown: true
			    },
			    params: {
                	id: Joi.string().min(3).max(100)
            	}
        	}
        }
    });

    return next();
};

exports.register.attributes = {  
	name: 'routes-users'
};