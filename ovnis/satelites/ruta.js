var route = require('express').Router();
var x = require('./controlador');

route.route('/data/satelite')
        .get(x.read)
        .post(x.create);

route.route('/data/satelite/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/satelite/xPlaneta/:id')
        .get(x.xPlaneta)

route.route('/data/satelite/contar/:id')
        .get(x.contar)


route.route('/data/satelite/artificiales/:id')
        .get(x.artificial)


module.exports = route;
