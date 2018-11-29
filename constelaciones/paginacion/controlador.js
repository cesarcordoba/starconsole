const _ = require('lodash');

module.exports = (documento, componente, nivel) => {
return new Promise(resolve => {
documento.write(`
import { Component, OnInit } from '@angular/core';
`)


Promise.all([
    componente.getPlaneta()
    // componente.getSubConstelaciones()
]).then(response => {

    let planeta = response[0]


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

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

`)


if(planeta)
documento.write(`

    ` + planeta.plural + ` = {
        items : []
    }
    filtro : any;
`)

documento.write(`
    constructor() {
        this.filtro = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        this.obtener()
    }

    obtener(){


`)

if(planeta)
documento.write(`
    `+ _.capitalize(planeta.singular) + `Service.paginacion(this.filtro)
    .then(response => this.` + planeta.plural + ` = response)
`)

documento.write(`

  }

  cambioPagina(ev){
      this.filtro.pagina = ev.pageIndex + 1
      this.obtener()
  }

  ngOnInit() {



  }
}`, (algo) => resolve(true))
    })
})
}
