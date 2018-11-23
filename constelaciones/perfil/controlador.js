const _ = require('lodash');

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, OnInit } from '@angular/core';
import { Title , Meta }     from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router'
import {  BehaviorSubject, Observable  } from 'rxjs'
`)


Promise.all([
    componente.getPlaneta()
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]


if(planeta)
documento.write(`
import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', 1) + `servicios';`)


documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: [
      './` + componente.nombre + `.component.styl'
  ]
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}
    //
    // pasar`+ _.capitalize(planeta.singular) + ` : BehaviorSubject<any>


`)


if(planeta)
documento.write(`
    ` + planeta.singular + `: any = {}
`)

documento.write(`
    constructor(public route : ActivatedRoute, private titleService: Title, private meta : Meta ) {
`)

if(planeta)
documento.write(`

    route.params.subscribe(async (res) =>
        `+ _.capitalize(planeta.singular) + `Service.one(Number(res.id))
        .then(response => this.` + planeta.singular + ` = response)
        .then(response => {

            console.log(response)

            // this.pasar`+ _.capitalize(planeta.singular) + `.next(response);

            this.titleService.setTitle( this.` + planeta.singular + `.nombre );
        // this.meta.updateTag({ name: 'description', content: _.replace( this.proyecto.resumen, '<p>', '')  })
        // this.meta.updateTag({ name: 'keywords', content: 'pagina web, presupuesto web, cotizador online, cotizador paginas web, presupuesto tienda online,' + this.proyecto.nombre })

    }))

`)

documento.write(`
  }

  ngOnInit() {



  }
}`, (algo) => resolve(true))
    })
})
}
