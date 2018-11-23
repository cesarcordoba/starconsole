const db = require('../relaciones');
var { orbita } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => orbita.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => orbita.findById(req.params.id)
    .then(orbita => orbita.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => orbita.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    orbita.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    orbita.findAll()
    .then(response => res.status(200).jsonp(response))
