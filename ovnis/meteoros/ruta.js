var route = require('express').Router();
var x = require('./controlador');

route.route('/data/meteoro')
        .get(x.read)
        .post(x.create);

route.route('/data/meteoro/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/meteoro/xPlaneta/:id')
        .get(x.xPlaneta)

module.exports = route;
