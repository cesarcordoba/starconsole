const db = require('../relaciones');
var { planeta, orbita } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => planeta.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => planeta.findById(req.params.id)
    .then(planeta => planeta.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => planeta.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    planeta.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    planeta.findAll()
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    planeta.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    planeta.findAll()
    .then(response => res.status(200).jsonp(response))

ex.todo =  (req, res, next) =>
    planeta.findAll({
        include : [
            {
                model : planeta,
                as : 'SubPlanetas'
            }
        ]
    })
    .then(response => res.status(200).jsonp(response))

ex.saltoespacial = (req, res, next) => {

    var otraorbita = [
        {  tipo : 2, nombre : 'HasMany',  orbita : {  tipo : 1, nombre : 'BelongsTo' } },
        {  tipo : 3, nombre : 'HasOne', orbita : {  tipo : 1, nombre : 'BelongsTo' } },
        {  tipo : 4, nombre : 'BelongsToMany', orbita : { tipo : 4, nombre : 'BelongsToMany' }},
        {  tipo : 5, nombre : 'Especial', orbita : { tipo : 7, nombre : 'Nodo' }},
        {  tipo : 6, nombre : 'Recursiva', orbita : { tipo : 5, nombre : 'Recursiva' }},
        {  tipo : 7, nombre : 'Nodo', orbita : { tipo : 5, nombre : 'Especial' }},
    ]

    Promise.all([
        planeta.findById(req.body.preplaneta.id),
        planeta.findById(req.body.subplaneta.id)
    ])
    .then(planetas => {
        planetas[0].addSubPlanetas(planetas[1], { through : req.body.orbita })
        planetas[0].addPrePlanetas(planetas[1], { through : otraorbita.find(n => n.tipo === req.body.orbita.tipo ).orbita })
    })

}
