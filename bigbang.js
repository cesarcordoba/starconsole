const _ = require('lodash');
var fs = require('fs');
const { planeta, constelacion, orbita } = require('./ovnis/relaciones');
var cosmos = require('./planetas/cosmos.js')

var vialactea = require('./estrellas/vialactea.js')

var front = {
    modelo : require('./planetas/front/modelo.js'),
    servicio : require('./planetas/front/servicio.js')
}

var back = {
    controlador : require('./planetas/back/controlador.js'),
    ruta : require('./planetas/back/ruta.js'),
    modelo : require('./planetas/back/modelo.js')
}

var ex = module.exports = {};

ex.ready = (req, res, next) => {

    planeta.findAll({
        include : [
            {
                model : planeta,
                as : 'SubPlanetas'
            }
        ]
    })
    .then(items => {

        res.status(200).jsonp(items)

        vialactea().error(items)
        vialactea().conexion(items)
        vialactea().back(items)
        vialactea().index_models(items)
        vialactea().index_services(items)


        var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 100)[page]) )

        const planetas = {
            [Symbol.asyncIterator]: async function* () {
                for (const n of items){
                    const guiaestelar = await cosmos(n)
                    await back.controlador(guiaestelar.back.controlador, n)
                    await back.ruta(guiaestelar.back.ruta, n)
                    await back.modelo(guiaestelar.back.modelo, n)
                    await front.modelo(guiaestelar.front.modelo, n)
                    await front.servicio(guiaestelar.front.servicio, n)
                    yield true
                }
            }
        }

        ;(async function(){
            for await (const planeta of planetas[ Symbol.asyncIterator ]()){}
        })()

    })
}


//
//
// })
//
// var rutasenelmain = fs.createWriteStream("paraElMain.js")
//
// modelos.forEach(modelo => {
//     rutasenelmain.write(`import { `+modelo.nombre+`Router } from './ovnis/rutas/`+modelo.nombre+`';
//     `)
// })
//
// modelos.forEach(modelo => {
//     rutasenelmain.write(`this.app.use('/', new `+modelo.nombre+`Router().rutas());
//     `)
// })
