const db = require('../relaciones');
const _ = require('lodash')
var { constelacion, dimension } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => constelacion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => constelacion.findById(req.params.id)
    .then(constelacion => constelacion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => constelacion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    constelacion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    constelacion.findAll()
    .then(response => res.status(200).jsonp(response))

ex.hierarchy =  (req, res, next) =>
    constelacion.findAll({
        raw: true,
        where : {
            IdGalaxia : req.params.id
        }
    })
    .then(response => {
        var arbol = (array, item) =>
            Object.assign(item , {
                children :  array.filter((v) =>  {
                    if(item.id === v.IdConstelacion){
                        arbol(array, v)
                        return v
                    }
                })
            })

        let algo = response.filter(n => _.isNull(n.IdConstelacion)).map(n => arbol(response, n))
        return algo

    })
    .then(response => res.status(200).jsonp(response))

ex.xGalaxia = (req, res, next) => {

    constelacion.findAll({
        where : {
            IdGalaxia : req.params.id
        }
    })
    .then(response => {
        console.log(response)
        res.status(200).jsonp(response)
    })

}
