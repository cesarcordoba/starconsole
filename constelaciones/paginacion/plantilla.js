const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {

constelacion.getPlaneta()
.then(planeta => {

documento.write(`
mat-card.componente
    mat-toolbar
        mat-toolbar-row(style="justify-content : space-between")
            .titulo
                h3 `+ constelacion.nombre + `
                strong Paginación

    mat-table(mat-table, [dataSource]="` + planeta.plural + `.items", class="mat-elevation-z8")
        ng-container(matColumnDef="nombre")
            mat-header-cell( *matHeaderCellDef) Nombre
            mat-cell( *matCellDef="let element") {{element.nombre}}
        mat-header-row( *matHeaderRowDef="['nombre']")
        mat-row(*matRowDef="let row; columns: ['nombre'];")
    mat-paginator([length]="` + planeta.plural + `.paginas * filtro.limite", [pageSize]="10", [pageSizeOptions]="[5, 10, 25, 100]", (page)="cambioPagina($event)")
`)

constelacion.getSubConstelaciones()
.then(constelaciones => {

    constelaciones.forEach(constelacion => {
documento.write(`
    `+ constelacion.nombre)
    })
})

})
.then(() => resolve(true))

    })
}
