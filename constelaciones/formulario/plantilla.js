const _ = require('lodash');


const { planeta, meteoro } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve =>
Promise.all([
    constelacion.getPlaneta({include :[ { model : meteoro, as : 'Meteoros' } ]}),
    constelacion.getSubConstelaciones()
]).then(response => {

    let planeta = response[0].get({plain : true })
    let constelaciones = response[1]

console.log('++++++++++++++++++++++')
console.log(planeta)
console.log('++++++++++++++++++++++')

documento.write(`
mat-card.componente
    h1 {{ `+ planeta.singular  + `?.nombre }}
    form(class="example-form")`)

planeta.Meteoros.forEach(meteoro => {

        documento.write(`
            mat-form-field
                input(matInput, placeholder="Busca un ` + meteoro.nombre  + `", [(ngModel)]="` + planeta.singular + `.` + meteoro.nombre  + `",  name="`+meteoro.nombre  + `")`)

})

documento.write(`
    button(mat-raised-button (click)="aceptar()") Aceptar
`)



    constelaciones.forEach(constelacion => {
documento.write(`
    `+ constelacion.nombre)
    })


}).then(() => resolve(true)))
}
