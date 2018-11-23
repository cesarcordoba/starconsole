const _ = require('lodash');

module.exports = (documento, modelo, nivel, nombre, estela) => {
return new Promise(resolve => {
documento.write(`
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../`+ _.repeat('../', nivel) + `extras/material.module';


import { `+ _.capitalize(modelo.nombre) + `Component } from './` + modelo.nombre + `.component';

`)

union(estela, modelo)
.forEach(n =>
documento.write(`
`+ n
))


modelo.hijos.forEach(hijo => {

documento.write(`

import { `+ _.capitalize(hijo.nombre) + _.capitalize(dif(hijo.hijos.length)) +  ` } from './`+ hijo.nombre + `/` + hijo.nombre  +  `.` +  dif(hijo.hijos.length) + `';
`)


})

documento.write(`
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,`)


modelo.hijos.forEach(hijo => {
if(hijo.hijos.length > 0){
documento.write(`
        `+ _.capitalize(hijo.nombre) + `Module,`)
}
})



documento.write(`
    ],
    declarations: [
        `+ _.capitalize(modelo.nombre) + `Component,`)

modelo.hijos.forEach(hijo => {
if(hijo.hijos.length === 0){
documento.write(`
        `+ _.capitalize(hijo.nombre) + `Component,`)
}})

documento.write(`
    ],
    exports: [
        ` +   _.capitalize(modelo.nombre)  + `Component
    ]
})
export class `+ _.capitalize(modelo.nombre) + `Module {}

`)
documento.write(``, (algo) => resolve(true))
    })
}

function dif(cantidad){
    return cantidad > 0 ? 'module' : 'component'
}

function union(array, constelacion){

    var links = []

    var unir = (constelacion) => {
        if(!_.isUndefined(constelacion)){
            constelacion.hijos.forEach(n => {
            
                links.push(`import { ` + _.capitalize(n.constelacion.nombre) + `Component } from '.` + n.constelacion.nombre  +  `/` + n.constelacion.nombre + `.component';`)
                unir(n)
            })
        }
    }

    unir(array.find(n => n.constelacion.id === constelacion.id))

    return links
}
