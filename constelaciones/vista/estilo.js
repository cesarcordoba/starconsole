const _ = require('lodash');

module.exports = (documento, modelo, nivel) => {
return new Promise(resolve => {
documento.write(`
@import  '../../../`+ _.repeat('../', nivel) + `defaults.styl'`)
documento.write(`

.container
    display flex
    justify-content center
    .content
        width 90%


`, (algo) => resolve(true))

    })
}
