var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {
    documento.write(`
        export { ProspectoService } from './prospecto.service';

        export { AWSService } from './aws.service';
        export * from './auth.service';
        export * from './usuario.service';

        // export * from './imagen.service';
    `)
data.forEach(modelo => {
    documento.write(`

        export { `+_.capitalize(modelo.singular)+`Service } from './`+_.capitalize(modelo.singular)+`.service';
    `)
})
})
}
