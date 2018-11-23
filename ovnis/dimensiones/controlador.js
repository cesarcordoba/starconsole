const db = require('../relaciones');
var {  dimension } = db;

var ex = module.exports = {};

ex.create = (req, res, next) =>  dimension.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) =>  dimension.findById(req.params.id)
    .then( dimension =>  dimension.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) =>  dimension.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    dimension.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    dimension.findAll()
    .then(response => res.status(200).jsonp(response))
