const _ = require('lodash');

const { planeta, meteoro } = require('../../ovnis/relaciones.js')

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
`)


Promise.all([
    componente.getPlaneta({include :[ { model : meteoro, as : 'Meteoros' } ]}),
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0].get({plain : true })


if(planeta)
documento.write(`

import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)


documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl']
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = false ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() ` + planeta.singular + `
    formulario: FormGroup;

`)


if(planeta)
documento.write(`

    ` + planeta.plural + `: any
`)

documento.write(`
    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({`)

        planeta.Meteoros.forEach(meteoro => {

            documento.write(`
            `+ meteoro.nombre  + ` : null,`)

        })
documento.write(`
        })`)

if(planeta)
documento.write(`
    // `+ _.capitalize(planeta.singular) + `Service.one()
    // .then(response => this.` + planeta.plural + ` = response)
    // .then(response => console.log(response))
`)

documento.write(`
  }

    ngOnInit() {
        console.log(this.producto)

        this.formulario = this.fb.group({
            nombre: [ this.producto.nombre ],
            status: [ this.producto.status ]
        })
    }


    aceptar(){

        console.log(this.` +   planeta.singular  + `)

        `+ _.capitalize(planeta.singular) + `Service.editar(this.`+ planeta.singular  +`)

    }


}`, (algo) => resolve(true))
    })
})
}
