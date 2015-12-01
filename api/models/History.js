"use strict";
var MODEL_NAME = 'history';

var EVENTS = {
	// records event
	CREATE: 'C',
	UPDATED: 'U',
	DELETE: 'D',

	// account event
	LOGIN: 'L',
	RESET_PASSWORD: 'RP',
	SET_PASSWORD: 'SP'

};

/**
* History.js
*
* @description :: Storage for every event valued for history
* @docs        :: http://sailsjs.org/#!documentation/models
 * @name History
*/

module.exports.History = {

	events: EVENTS,
		schema: true,
	  tableName: 'notable_events',
	  autoCreatedAt: false,
	  autoUpdatedAt: false,

  attributes: {

	  who: {
		  model: 'Account',
		  required: true,
		  defaultsTo: function(){
			  if(!sails.currentUser){
				  sails.log.error(MODEL_NAME + ':attributes:who:defaultsTo', 'Unable to set default value, currentUser are not defined');
				  throw new Error('Current user are not defined, is it intruder?');
			  }
			  return sails.currentUser;
		  }
	  },

	  what: {
		  type: 'string',
		  required: true
	  },

	  where: {
		  type: 'string',
		  required: true
	  },

	  when: {
		  type: 'datetime',
		  required: true,
		  defaultsTo: function(){
			  return new Date();
		  }
	  },

	  snapshot: {
		  type: 'JSON'
	  },

	  /**
	   * When user try to delete some data, it's mean he want to hide something, shame as usually.
	   * @abstract This method mean anything key feature is try to use @test annotation to testing model instance method on bootstrap phase.
	   * @returns {boolean}
	   * @test [{what: 'D'}] => true
	   * @test [{what: 'C'}] => false
	   * @test [{what: 'U'}] => false
	   */
	  isShame: function(){
		  return (this.what === EVENTS.DELETE);
	  },

	  /**
	   * @abstract Same key as above but here we have parameter
	   * @param what {String}
	   * @returns {boolean}
	   * @test [{what: 'C'}, 'C'] => true
	   * @test [{what: 'U'}, 'C'] => false
	   * @test [{what: 'U'}, 'not eligible'] => false
	   * @test [{what: null}, 'everything'] => false
	   */
	  isWas: function(what){
		  return (this.what === what);
	  },

	  /**
	   * @abstract More complexity method, here we have exceptions.
	   * @param startDate
	   * @param endDate
	   * @test [{when: new Date('1980-01-06')}, '1977-08-10', '2000-05-10'] => true
	   * @test [{when: new Date('1980-01-06')}, '1981-08-10', '2000-05-10'] => false
	   */
	  itWasBetween: function(startDate, endDate){
		  var sDate;
		  var eDate;

		  if(_.isDate(startDate)){
			  sDate = startDate;
		  }else{
			 try {
				 sDate = new Date(startDate);
			 }catch (e){
				 throw e;
			 }
		  }

		  if(_.isDate(endDate)){
			  eDate = endDate;
		  }else{
			  try{
				  eDate = new Date(endDate);
			  }catch (e){
				  throw e;
			  }
		  }

		  if(sDate >= eDate){
			  throw new RangeError('Start date should be early then end date');
		  }

		  return (sDate <= this.when) && (eDate >= this.when);
	  }

  },

	beforeDestroy: function(criteria, next){
		return next(new Error('History are untouched!', 403));
	},

	beforeUpdate: function(attributes, next){
		return next(new Error('History is not rewritable!', 403));
	},

	afterCreate: function(attributes, next){
		sails.log.info(MODEL_NAME+':afterCreate', 'New record for history', attributes);
		next();
	}

};

