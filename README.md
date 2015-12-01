# js-doc-test

Main goal it's try to use jsdoc annotation for testing model instance methods.
Sandbox - app over [sails](http://sailsjs.org).

## Similar solutions // To review
* https://github.com/jeromeetienne/jsdoced.js
* http://stackoverflow.com/questions/31597681/build-unit-tests-based-on-jsdoc-examples
* http://stackoverflow.com/questions/3179861/javascript-get-function-body
* http://usejsdoc.org/tags-example.html

## Aside goals:
* es2015, babel
* to have some code for testing I wish to implement storing history of valuable changes in some model in 3d part storage (not in main db), in manner logging, e.g. sails.log.info('app:model:create', {timestamp, client info, other  information).
* remote log storage, winston, etc.
* try to wrap it to docker. (subtask: wrap, define configs, include DQL, quick deploy with full infrastructure)
* refactoring worked prototype in microservice architecture.
