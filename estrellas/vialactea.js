
var estrella =  {
    admin : require('./front/admin.js'),
    main : require('./front/main.js'),
    back : require('./back/main.js'),
    error : require('./back/error.js'),
    conexion : require('./back/conexion.js'),
    index_models: require('./front/index_models'),
    index_services: require('./front/index_services')
}

const _ = require('lodash');
var fs = require('fs');


module.exports = (modelos) => {

    return {
        error : (modelos) => estrella.error(escribir('../2.-backend/server/http/error.ts')),
        conexion : (modelos) => estrella.conexion(modelos, escribir('../2.-backend/server/http/conexion.ts')),
        back : (modelos) => estrella.back(modelos, escribir('../2.-backend/server/main.ts')),
        main : (modelos) => estrella.main(modelos, escribir('../1.-frontend/src/app/modulos/main/main.module.ts')),
        admin : (modelos) => estrella.admin(modelos, escribir('../1.-frontend/src/app/modulos/admin/admin.module.ts')),
        index_models: (modelos) => estrella.index_models(modelos, escribir('../1.-frontend/src/app/modelos/index.ts')),
        index_services: (modelos) => estrella.index_services(modelos, escribir('../1.-frontend/src/app/servicios/index.ts'))
    }

}


var escribir = (url) => fs.createWriteStream(url)
