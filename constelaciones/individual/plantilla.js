const _ = require('lodash');


const { planeta } = require('../../ovnis/relaciones.js')

module.exports = (documento, constelacion, nivel) => {
return new Promise(resolve => {


documento.write(`
mat-card.componente
    h1 `+ constelacion.nombre  +  nivel + `
    p INDIVIDUAL`
)

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
