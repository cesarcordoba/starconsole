var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {
    documento.write(`
export { Video } from './video.model';
export { Prospecto } from './prospecto.model';
// export { Imagen } from './imagen.model';
export { Usuario } from './usuario.model';
    `)
data.forEach(modelo => {
    documento.write(`

        export { `+_.capitalize(modelo.singular)+` } from './`+_.capitalize(modelo.singular)+`.model';
    `)
})
})
}
