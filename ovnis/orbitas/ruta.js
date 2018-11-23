var route = require('express').Router();
var x = require('./controlador');

route.route('/data/orbita')
        .get(x.read)
        .post(x.create);

route.route('/data/orbita/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);


module.exports = route;
