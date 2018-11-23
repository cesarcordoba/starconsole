const _ = require('lodash');
const proceso = require('./servicio/proceso.js');
const importaciones = require('./servicio/importaciones.js');

module.exports = (documento, modelo) => {
return new Promise(resolve => {
documento.write(`
import { Injectable } from '@angular/core'
import { APILOCAL } from '../../environments/environment'
import { `+ _.capitalize(modelo.singular) +` } from '../modelos/`+ _.capitalize(modelo.singular) +`.model'
import * as axios from 'axios'
`)


modelo.SubPlanetas.reduce(
    (chain, planeta, key) => chain.then(() => importaciones(planeta, documento, modelo, chain, key)),
    Promise.resolve([ modelo.singular ])
)
.then(() => {





documento.write(`
const url = APILOCAL.url

@Injectable()
export class `+ _.capitalize(modelo.singular) +`Service {

    public static crear = (peticion) => axios.default.post( url + '/data/`+  modelo.singular  +`', peticion).then(response =>  new `+ _.capitalize(modelo.singular) +`( response.data ))
    public static obtener = () => axios.default.get( url + '/data/`+  modelo.singular  +`').then(response => response.data.map(n => new `+ _.capitalize(modelo.singular) +`( n )))
    public static one = (id) => axios.default.get( url + '/data/`+  modelo.singular  +`/' + id).then(response =>  new `+ _.capitalize(modelo.singular) +`( response.data ))
    public static editar = (peticion) => axios.default.put( url + '/data/`+  modelo.singular  +`/' + peticion.id , peticion)
    public static eliminar = id => axios.default.delete( url + '/data/`+  modelo.singular  +`/' + id )
    public static paginacion = peticion => axios.default.post( url + '/data/`+  modelo.singular  +`/paginacion', peticion )
    .then(response => Object.assign(response.data, {items : response.data.items.map(n => new `+ _.capitalize(modelo.singular) +`( n ))}))
`)
}).then(() =>
Promise.all(
modelo.SubPlanetas.map(planeta =>
    proceso(documento, modelo, planeta))))
.then(() => modelo.getSatelites())
.then(satelites => Promise.all(
    satelites.map(async (satelite) => documento.write(`
    public static ` +  satelite.nombre  + ` = (` + ( _.isNull(satelite.params) ? '' : satelite.params ) +`) => axios.default.` +  satelite.tipo  +  `( url + '/data/`+ modelo.singular +`_` +  satelite.ruta_front  +  ` ).then(response => response.data)`)
    )
))
.then(() => documento.write(`

    //- Finalizo
}`, (algo) => resolve(true)))
    })
}
