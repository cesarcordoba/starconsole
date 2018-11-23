const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MaterialModule } from '../../`+ _.repeat('../', nivel) + `extras/material.module';


import { `+ _.capitalize(modelo.nombre) + `Component } from './` + modelo.nombre + `.component';

`)

modelo.hijos.forEach(hijo => {

if(hijo.tipo === 'ficha'){
documento.write(`
//    ` + nivel +`
import { `+ _.capitalize(hijo.nombre) + _.capitalize(dif(hijo.hijos.length)) +  ` } from './`+ _.repeat('../', nivel) + `compartidos/`+ hijo.nombre + `/` + hijo.nombre  +  `.` +  dif(hijo.hijos.length) + `';
`)
}else
documento.write(`
//    ` + nivel +`
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
