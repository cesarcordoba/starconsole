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


import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component'
import { AdminRoutingModule } from './admin-routing.module';
import { ConfirmDelDialogComponent } from './fragments/confirm-del-dialog/confirm-del-dialog.component';
import { LoginComponent } from './login/login.component';
import { DetallesUsuarioComponent } from './fragments/detalles-usuario/detalles-usuario.component';
import { AgregarUsuarioComponent } from './fragments/agregar-usuario/agregar-usuario.component';

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
		AdminRoutingModule,
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
		ConfirmDelDialogComponent,
		DetallesUsuarioComponent,
		AgregarUsuarioComponent,
	],
	declarations: [
		AdminComponent,
		ConfirmDelDialogComponent,
		LoginComponent,
		DetallesUsuarioComponent,
		AgregarUsuarioComponent,
	]
})
export class AdminModule { }
`, (algo) => resolve(true))
    })
}
