const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {

constelacion.getSubConstelaciones()
.then(constelaciones => {
documento.write(`
section
    .container
        .content
            mat-card.componente([ngStyle]="borde")
                mat-toolbar
                    mat-toolbar-row(style="justify-content : space-between")
                        .titulo
                            h3 `+ constelacion.nombre + `
                            strong Vista`)



constelaciones.forEach(constelacion => {
    documento.write(`
                `+ constelacion.nombre)
    })
})

.then(() => resolve(true))

    })
}
