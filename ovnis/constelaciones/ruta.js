var route = require('express').Router();
var x = require('./controlador');

route.route('/data/constelacion')
        .get(x.read)
        .post(x.create);

route.route('/data/constelacion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/hierarchy/:id')
        .get(x.hierarchy)

route.route('/data/constelacion/xGalaxia/:id')
        .get(x.xGalaxia)



module.exports = route;
