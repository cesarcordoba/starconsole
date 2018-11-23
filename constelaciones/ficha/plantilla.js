const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')
const portal = require('../portales.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {
Promise.all([
constelacion.getPlaneta()
])
.then(planeta => {


documento.write(`

mat-card.componente
    mat-toolbar
        mat-toolbar-row(style="justify-content : space-between")
            .titulo
                h3 {{`+ planeta[0].singular + `?.nombre }}
                strong Ficha`)

constelacion.getSubConstelaciones({
    include : [
        {
            model : planeta,
            as : 'Planeta'
        }
    ]
})
.then(constelaciones => {

constelaciones.forEach(constelacion => {
documento.write(`
    //` + portal(constelacion))
    })
})
})
.then(() => resolve(true))

    })
}
