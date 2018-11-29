var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {

documento.write(`

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MaterialModule } from './../../extras/material.module';
import { ExtrasModule } from './../../extras/extras.module';


import { AsesorComponent } from './asesor.component';
import { HomeComponent } from './home/home.component'
import { AsesorRoutingModule } from './asesor-routing.module';

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
		FormsModule, ReactiveFormsModule,
		AsesorRoutingModule,
		SlickCarouselModule,
		FroalaEditorModule, FroalaViewModule,
		ExtrasModule,
		MaterialModule,`)

data.forEach(n =>
documento.write(`
        `+_.capitalize(n.nombre)+`Module,`))

documento.write(`
		],
	entryComponents: [
	],
	declarations: [
		AsesorComponent
	]
})
export class AsesorModule { }
`, (algo) => resolve(true))
    })
}
