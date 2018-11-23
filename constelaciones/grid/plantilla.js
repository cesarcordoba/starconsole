const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {

Promise.all([
    constelacion.getPlaneta(),
    constelacion.getSubConstelaciones(),
    constelacion.getSubDimensiones({
        include : [{
            model : planeta,
            as : 'Planeta'
        }]
    })
])


.then(response => {

    let planeta = response[0]
    let constelaciones = response[1]
    let dimensiones = response[2]


documento.write(`
mat-card.componente
    mat-toolbar
        mat-toolbar-row(style="justify-content : space-between")
            .titulo
                h3 `+ constelacion.nombre + `
                strong Grid
    mat-grid-list(
        cols="{{columnas}}",
        rowHeight="{{height}}"
        )
        mat-grid-tile( *ngFor="let ` + planeta.singular + ` of ` + planeta.plural + `?.items", [colspan]="colspan", [rowspan]="rowspan")
            `)

dimensiones.forEach(dimension => {
    dimension = dimension.get({plain : true})
    documento.write(`
                `+ dimension.nombre + `([` + dimension.Planeta.singular + `]="` + dimension.Planeta.singular + `")` )
})

constelaciones.forEach(constelacion => {
        if(constelacion.tipo === 'ficha')
            documento.write(`
                `+ constelacion.nombre + `([` + planeta.singular + `]="` + planeta.singular + `")` )
})

documento.write(`
mat-paginator([length]="` + planeta.plural + `.items.length", [pageSize]="10", [pageSizeOptions]="[5, 10, 25, 100]")
`)


})
.then(() => resolve(true))

    })
}
