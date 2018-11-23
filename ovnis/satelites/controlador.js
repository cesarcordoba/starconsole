const _ = require('lodash')
const fs = require('fs')
const db = require('../relaciones');
var { satelite, planeta } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => satelite.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => satelite.findById(req.params.id)
    .then(satelite => satelite.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => satelite.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    satelite.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    satelite.findAll()
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    satelite.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    satelite.findAll()
    .then(response => res.status(200).jsonp(response))

ex.xPlaneta =  (req, res, next) =>
    satelite.findAll({ where : { IdPlaneta : req.params.id } })
    .then(response => res.status(200).jsonp(response))

ex.contar =  (req, res, next) =>
    satelite.count({ where : { IdPlaneta : req.params.id } })
    .then(response => res.status(200).jsonp(response))


ex.artificial =  (req, res, next) => {

    var direcciones = {
        prueba : (modelo) => '../2.-backend/server/http/' + modelo + '/controlador.ts',
        controlador : (modelo) => '../2.-backend/server/http/controladores/' + _.capitalize(modelo) + '.ts',
        modelo : (modelo) => '../../../2.-backend/server/http/modelos/' + modelo + '.ts',
        ruta : (modelo) => '../../../2.-backend/server/http/rutas/' + modelo + '.ts'
    }

    planeta.findById(req.params.id)
    .then(response => {

        console.log(response.plural)

        let direccion = direcciones.prueba(response.singular)
        console.log(direccion)
        //
        let buscar = fs.existsSync(direccion)
        console.log(buscar)

        let file = fs.readFileSync(direccion, 'utf8')
        let array = []
        let palabras = _.words(file)
        palabras.forEach((n, key) => {
            if(n === 'req' && palabras[key + 1] ==='Request' )
                array.push({
                    nombre : palabras[key - 1],
                    planeta : Number(palabras[key - 2])
                })
        })

        console.log(palabras)

        return array

    })
    .then(response => res.status(200).jsonp(response))


    // satelite.findAll({ where : { IdPlaneta : req.params.id } })
    // .then(response => res.status(200).jsonp(response))
}
