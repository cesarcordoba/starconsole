var fs = require('fs');
const _ = require('lodash');


module.exports = (documento) => {
return new Promise(resolve => {
documento.write(`

module.exports = (err, nombre) => {
    console.log(nombre)
    console.log(err)

`)

documento.write(`
}`, (algo) => resolve(true))
    })
}
