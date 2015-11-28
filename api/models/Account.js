"use strict";
var uuid = require('uuid');

var MODEL_NAME='account';

/**
* Account.js
*
* @description :: Account model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		schema: true,
	  tableName: 'accounts',
	  autoId: false,
	  autoCreateAt: false,
	  autoUpdatedAt: false,

	  id: {
		  id: true,
		  unique: true,
		  defaultsTo: function(){
			  return uuid.v4();

		  }
	  },
	  email: {
		  type: 'email',
		  require: true,
		  unique: true
	  },

	  password: {
		  type: 'string',
		  required: true
	  },

	  profile: {
			model: 'Person'
	  },

	  history: {
		  collection: 'History', via: 'model'

	  }

  },

	afterCreate: function(attributes, next){
		var history ={
			where: MODEL_NAME,
			what: History.events.CREATE,
			snapshot: attributes
		};

		History.create(history).exec(next);
	}

};

