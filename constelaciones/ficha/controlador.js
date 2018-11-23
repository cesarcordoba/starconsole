const _ = require('lodash');



module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
    import { Component, Input, OnInit } from '@angular/core';

`)


Promise.all([
    componente.getPlaneta()
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]

if(planeta){
documento.write(`
import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', 2) + `servicios';`)
}

documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl']
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    @Input() ` + planeta.singular + `

`)


documento.write(`
    constructor() {
`)

if(planeta)
documento.write(`
    // `+ _.capitalize(planeta.singular) + `Service.one()
    // .then(response => this.` + planeta.plural + ` = response)
    // .then(response => console.log(response))
`)

documento.write(`
  }

  ngOnInit() {

      console.log( this.` + planeta.singular + `  )

  }
}`, (algo) => resolve(true))
    })
})
}
