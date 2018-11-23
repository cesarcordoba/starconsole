const _ = require('lodash');

module.exports = (constelacion) => {


    var direcciones = [
        'perfil','individual', 'paginacion', 'seccion', 'vista', 'lista', 'grid', 'ficha', 'slider', 'simple', 'autocomplete', 'chip', 'formulario'
    ].map(n => new Object({
        nombre : n,
        controlador : require('./' + n + '/controlador.js'),
        estilo : require('./' + n + '/estilo.js'),
        plantilla : require('./' + n + '/plantilla.js'),
        modulo : require('./' + n + '/modulo.js')
    }))

    var componente = {
        controlador : require('./componente/controlador.js'),
        estilo : require('./componente/estilo.js'),
        plantilla : require('./componente/plantilla.js'),
        modulo : require('./componente/modulo.js')
    }


    let encontrado = direcciones.find(n => n.nombre === constelacion.tipo)

    console.log(encontrado)

    return _.isUndefined(encontrado) ? componente : encontrado

}
