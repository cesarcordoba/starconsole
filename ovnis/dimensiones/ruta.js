var route = require('express').Router();
var x = require('./controlador');

route.route('/data/dimension')
        .get(x.read)
        .post(x.create);

route.route('/data/dimension/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
