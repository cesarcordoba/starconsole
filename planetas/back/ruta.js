const _ = require('lodash');
const proceso = require('./ruta/proceso.js');

module.exports = (documento, modelo) => {
return new Promise(resolve => {
documento.write(`
import { Router } from "express";
import { `+ _.capitalize(modelo.singular) +`Controller } from "./controlador";

export class `+ _.capitalize(modelo.singular) +`Router {
    private _rutas = Router();
    private controlador: `+ _.capitalize(modelo.singular) +`Controller;

    constructor() {
        this.controlador = new `+ _.capitalize(modelo.singular) +`Controller();
        this.init();
    }

    private init() {
        //*
        this._rutas.route('/data/`+ modelo.singular +`')
            .get(this.controlador.buscar)
            .post(this.controlador.crear);

        //*
        this._rutas.route('/data/`+ modelo.singular +`/:id')
            .get(this.controlador.buscar)
            .put(this.controlador.actualizar)
            .delete(this.controlador.eliminar);

        //*
        this._rutas.route('/data/`+ modelo.singular +`/paginacion')
            .post(this.controlador.paginacion);

`)

Promise.all(
modelo.SubPlanetas.map(planeta =>
    proceso(documento, modelo, planeta)))

.then(() => modelo.getSatelites())
.then(satelites => Promise.all(
    satelites.map(async (satelite) => documento.write(`

        this._rutas.route('/data/`+ modelo.singular +`_` +  satelite.ruta_back +  `')
            .` +  satelite.tipo +  `(this.controlador.` +  satelite.nombre +  `)

        `)
    )
))


.then(() => documento.write(`
        }

    rutas() {
        return this._rutas;
    }
}
`, (algo) => resolve(true)))


    })
}
