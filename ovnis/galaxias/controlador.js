const db = require('../relaciones');
const _ = require('lodash')
var { galaxia } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => galaxia.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => galaxia.findById(req.params.id)
    .then(galaxia => galaxia.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => galaxia.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    galaxia.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    galaxia.findAll()
    .then(response => res.status(200).jsonp(response))
