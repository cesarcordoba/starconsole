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
    h1 `+ constelacion.nombre  +  nivel + `
    p {{  ` + planeta[0].singular + `.nombre  }}`
)

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
