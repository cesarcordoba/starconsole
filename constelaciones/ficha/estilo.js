const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
// documento.write(`` + nivel + ``)
documento.write(`
@import  '../../../`+ _.repeat('../', 2) + `defaults.styl'`)
documento.write(``, (algo) => resolve(true))
    })
}
