const _ = require('lodash');

module.exports = (documento, modelo) => {
return new Promise(resolve => {
    documento.write(`
import { `+ _.capitalize(modelo.singular) +`Service } from '../servicios/`+ _.capitalize(modelo.singular) +`.service'
`)

// modelo.SubPlanetas.forEach(planeta => {
//     if(modelo.id !== planeta.id)
//         documento.write(`
// import { `+ _.capitalize(planeta.singular) +`Service } from '../services/`+ _.capitalize(planeta.singular) +`.service'
//     `)
// })

documento.write(`
export class `+ _.capitalize(modelo.singular) +` {
    id: number;

`)

// modelo.SubPlanetas.forEach(planeta => {
//     var tipo = planeta.get({plan : true}).orbitas.tipo
//
//     if(tipo === 1)
//     documento.write(`
//     ` +  planeta.singular  + ` : any
//     `)
//
//     if(tipo === 3 || tipo ===  2 || tipo ===  4)
//     documento.write(`
//     ` +  planeta.plural  + ` : any`)
//
// })

documento.write(`

    constructor(arg) {
        Object.entries(arg).forEach(n => this[n[0]] = n[1])
    }


`)
//
// modelo.SubPlanetas.forEach(planeta => {
//
//     var tipo = planeta.get({plan : true}).orbitas.tipo
//
//     if(tipo === 1)
//         documento.write(`
//     Obtener` +  _.capitalize(planeta.singular) + `(){
//         ` +  _.capitalize(modelo.singular) + `Service.` +  planeta.singular  + `(this.id)
//         .then(response => this.` +  planeta.singular  +  ` = response)
//     }`)
//
//     if(tipo === 3 || tipo ===  2 || tipo ===  4)
//         documento.write(`
//
//     Obtener` +  _.capitalize(planeta.plural)  + `(){
//         ` +  _.capitalize(modelo.singular) + `Service.` +  planeta.plural  + `(this.id)
//         .then(response => this.` +  planeta.plural  +  ` = response)
//     }`)
// })


documento.write(`

}`
, (algo) => resolve(true))

})
}
