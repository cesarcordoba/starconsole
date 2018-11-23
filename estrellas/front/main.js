var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {

documento.write(`

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';


import { MaterialModule } from '../../extras/material.module';
import { ExtrasModule } from '../../extras/extras.module';


import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
`)

data.forEach(n =>
documento.write(`
import { `+   _.capitalize(n.nombre)   +`Module } from './`+   n.nombre   +`/`+   n.nombre   +`.module';
`)
)

documento.write(`
@NgModule({
	imports: [
		CommonModule,
		MainRoutingModule,
		SlickCarouselModule,
		MaterialModule,
		ExtrasModule,
		FormsModule,
		ReactiveFormsModule,
		`)

data.forEach(n =>
documento.write(`
        `+_.capitalize(n.nombre)+`Module,`))

documento.write(`
	],
	declarations: [
		MainComponent,
		IniciarSesionComponent
	]
})
export class MainModule { }
`, (algo) => resolve(true))
    })
}
