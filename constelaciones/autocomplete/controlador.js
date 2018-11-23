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



if(planeta){
documento.write(`
import { Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import * as _ from 'lodash'

import { `+ _.capitalize(planeta.singular) + `Service } from '../../`+ _.repeat('../', nivel) + `servicios';`)
}

documento.write(`
@Component({
  selector: '` + componente.nombre + `',
  templateUrl: './` + componente.nombre + `.component.pug',
  styleUrls: ['./` + componente.nombre + `.component.styl']
})
export class `+ _.capitalize(componente.nombre) + `Component implements OnInit {

    borde = ` +  _.isEqual( componente.status, 1 )  + ` ?  {'border-color':'rgb(76, 175, 80)'} : {'border-color':'rgb(244, 67, 54)'}

    items : Observable<any>;

    itemsfiltrados : any[] = [];
    formulario: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder) {

        this.formulario = this.fb.group({
            input: null
        })

        let observador = (value) =>
            Observable.create( (observer: any) => {
                `+ _.capitalize(planeta.singular) + `Service.xNombre({nombre : value, status : 1})
                .then((data)=>{
                    observer.next(data);
                 },(reason)=>{
                    observer.error(reason);
                 })
            })

        this.formulario
        .get('input')
        .valueChanges
        .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
            switchMap(value =>
                observador(value)
                .pipe(finalize(() => this.isLoading = false))
        ))
        .subscribe((items : any[]) => {
            console.log(items)
            this.itemsfiltrados = items
        });

  }

  ngOnInit() {



  }
}`, (algo) => resolve(true))
    })
})
}
