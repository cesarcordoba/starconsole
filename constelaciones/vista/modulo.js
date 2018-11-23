const _ = require('lodash');

module.exports = (documento, modelo, nivel, nombre, estela, lista) => {
return new Promise(resolve => {
documento.write(`
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../`+ _.repeat('../', nivel) + `extras/material.module';
import { SlickModule } from 'ngx-slick';
import { FormsModule, FormControl, ReactiveFormsModule } from "@angular/forms";
import { RangeSliderModule } from 'ngx-range-slider'

import { `+ _.capitalize(modelo.nombre) + `Component } from './` + modelo.nombre + `.component';

`)

buscarcomponentes(estela, modelo)
.forEach(n => {
documento.write(`
import { ` + _.capitalize(n.constelacion.nombre) + `Component } from '.` +  n.link  +   `/` + n.constelacion.nombre  +  `/` + n.constelacion.nombre + `.component';`
)
})


_.uniq(buscarmodulos(lista, modelo)).forEach(n => {
documento.write(`
import { ` + _.capitalize(n.nombre) + `Module } from './../compartidos/` + n.nombre  +  `/` + n.nombre + `.module';`
)})

documento.write(`


@NgModule({
    imports: [
        SlickModule.forRoot(),
        CommonModule,
        MaterialModule,
        RangeSliderModule,
        FormsModule,
        ReactiveFormsModule,
`)


_.uniq(buscarmodulos(lista, modelo)).forEach(n =>
documento.write(`
        ` + _.capitalize(n.nombre) + `Module, `
))

documento.write(`],
    declarations: [
        `+ _.capitalize(modelo.nombre) + `Component,`)



buscarcomponentes(estela, modelo)
.forEach(n => documento.write(`
        ` + _.capitalize(n.constelacion.nombre) +  `Component,`))

documento.write(`
    ],
    exports: []
})
export class `+ _.capitalize(modelo.nombre) + `Module {}

`)
documento.write(``, (algo) => resolve(true))
    })
}

function dif(cantidad){
    return cantidad > 0 ? 'module' : 'component'
}

function buscarcomponentes(array, constelacion){
    var links = []
    var unir = (constelacion, link) => {
        if(!_.isUndefined(constelacion)){
            constelacion.hijos.forEach(n => {
                links.push(Object.assign(n, {link : link}))
                unir(n, link + '/' + n.constelacion.nombre  )
            })
        }
    }
    unir(array.find(n => n.constelacion.id === constelacion.id), '')
    return links
}

function buscarmodulos(lista, modelo){

    var links = []

    ;(function unir(modelo){
        if(modelo.tipo === 'ficha')
            links.push(modelo)

        lista.filter(n => n.IdConstelacion === modelo.id)
        .forEach(n => {
            unir(n)
        })

    })(modelo)


    return links

}
