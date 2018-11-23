const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
@import  '../../../`+ _.repeat('../', nivel) + `defaults.styl'`)
documento.write(``, (algo) => resolve(true))
    })
}
