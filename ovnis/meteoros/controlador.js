const db = require('../relaciones');
const _ = require('lodash')
var { meteoro } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => meteoro.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => meteoro.findById(req.params.id)
    .then(meteoro => meteoro.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => meteoro.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    meteoro.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    meteoro.findAll()
    .then(response => res.status(200).jsonp(response))

ex.xPlaneta = (req, res, next) =>
    meteoro.findAll({ where : { IdPlaneta : req.params.id }})
    .then(response => res.status(200).jsonp(response))
