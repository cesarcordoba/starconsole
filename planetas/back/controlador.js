
const _ = require('lodash');
const fs = require('fs');
const proceso = require('./controlador/proceso.js');


module.exports = (documento, modelo) => {
return new Promise(resolve => {

modelo.getSatelites()
.then(satelites => Promise.all(
    satelites.map(async (satelite) => {

if(satelite.status === 0){

    if (!fs.existsSync('../2.-backend/server/http/' + modelo.singular + '/' + satelite.nombre)){
        fs.mkdirSync('../2.-backend/server/http/' + modelo.singular + '/' + satelite.nombre)
    }

    fs.createWriteStream('../2.-backend/server/http/' + modelo.singular + '/' + satelite.nombre  + '/' + satelite.nombre + '.ts').write(`

import { ` +  _.capitalize(modelo.singular) +  ` } from '../modelo'
const _ = require('lodash');
module.exports = (req, res, next) => {
    return new Promise((resolve, reject) => {
    ` +  satelite.contenido +  `

    })
}

    `)
}


    return documento.write(`
const ` +  satelite.nombre   + ` = require('./` +  satelite.nombre   + `/` +  satelite.nombre   + `');
    `)
}
    )
))
.then(() =>
documento.write(`
const errorHandler = require('../error');
const _ = require('lodash');

import { `+ _.capitalize(modelo.singular) +` } from "./modelo";
import { Response, Request, NextFunction } from "express-serve-static-core";

export class `+ _.capitalize(modelo.singular) +`Controller {

    //* null
    crear = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.create(req.body)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'crear`+ _.capitalize(modelo.singular) +`'))

    //* null
    buscar = (req: Request, res: Response, next: NextFunction) => req.params.id ?
        `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscar`+ _.capitalize(modelo.singular) +`'))
        :
        `+ _.capitalize(modelo.singular) +`.findAll()
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'buscar`+ _.capitalize(modelo.singular) +`'))
    //* null
    actualizar = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.update(req.body,{ where: { id: req.params.id}})
            .then(response => res.status(200).jsonp(response))
            .catch(err => errorHandler(err, 'actualizar`+ _.capitalize(modelo.singular) +`'))

    //* null
    eliminar = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
            .then(response => response.destroy()
            .then(response => res.status(200).jsonp(response)))
            .catch(err => errorHandler(err, 'eliminar`+ _.capitalize(modelo.singular) +`'))

    //* null
    paginacion = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findAndCountAll({
            // order : ['nombre']
        	}).then(response =>
                res.status(200).jsonp(
                    new Object({
                        items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                        paginas : Math.round(response.count / req.body.limite)
                    })))
            .catch(err => errorHandler(err, 'paginacion`+ _.capitalize(modelo.singular) +`'))

`)
)
.then(() => Promise.all(
modelo.SubPlanetas.map(planeta =>
    proceso(documento, modelo, planeta))))
.then(() => modelo.getSatelites())
.then(satelites => Promise.all(
    satelites.map(async (satelite) => documento.write(`
    ` +  satelite.nombre +  ` = (req: Request, res: Response, next: NextFunction) =>
        ` +  satelite.nombre +  `(req, res, next)
        .then(response => res.status(200).jsonp(response))
        .catch(err => errorHandler(err, '`+ _.capitalize(modelo.singular) + '_'+ satelite.nombre + `'))
    `)
    )
))
.then(() => documento.write(`
}`, (algo) => resolve(true)))

})
}
