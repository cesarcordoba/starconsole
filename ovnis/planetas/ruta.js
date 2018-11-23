var route = require('express').Router();
var x = require('./controlador');

route.route('/data/planeta')
        .get(x.read)
        .post(x.create);

route.route('/data/planeta/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/planetasysusorbitas')
        .get(x.todo);


route.route('/data/saltoespacial')
        .post(x.saltoespacial);




module.exports = route;
