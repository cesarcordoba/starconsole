const _ = require('lodash');
var fs = require('fs');

var production = 'resultados/back/'

module.exports = (modelo) =>
    new Promise(resolve => {


        if (!fs.existsSync('../2.-backend/server/http/' + modelo.singular)){
            fs.mkdirSync('../2.-backend/server/http/' + modelo.singular)
        }

        resolve({
            back : {
                controlador :  escribir('../2.-backend/server/http/' + modelo.singular + '/controlador.ts'),
                modelo :  escribir('../2.-backend/server/http/' + modelo.singular + '/modelo.ts'),
                ruta :  escribir('../2.-backend/server/http/' + modelo.singular + '/ruta.ts')
            },
            front : {
                modelo : escribir('../1.-frontend/src/app/modelos/' + _.capitalize(modelo.singular) + '.model.ts'),
                servicio : escribir('../1.-frontend/src/app/servicios/' + _.capitalize(modelo.singular) + '.service.ts')
            }
        })
})

var escribir = (url) => {
    return fs.createWriteStream(url)
}
