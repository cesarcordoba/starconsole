const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {


documento.write(`
.autocomplete
    form(class="example-form", [formGroup]='formulario')
        mat-form-field
            input(matInput, placeholder="Busca un ` + constelacion.nombre  + `   ", [matAutocomplete]="auto", formControlName='input')

    mat-autocomplete(#auto="matAutocomplete")
        mat-option(*ngIf="isLoading", class="is-loading")
            mat-spinner(diameter="50")
        ng-container(*ngIf="!isLoading")
            mat-option(*ngFor="let item of itemsfiltrados", [value]="item")
                span {{ item.nombre }} `)

constelacion.getSubConstelaciones()
.then(constelaciones => {

    constelaciones.forEach(constelacion => {
documento.write(`
    `+ constelacion.nombre)
    })
})
.then(() => resolve(true))

    })
}
