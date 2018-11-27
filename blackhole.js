const _ = require('lodash');
var fs = require('fs');

var vialactea = require('./estrellas/vialactea.js')
var supernova = require('./constelaciones/supernova.js')

const { planeta, constelacion, galaxia, dimension } = require('./ovnis/relaciones');

const mapa = require('./constelaciones/mapa.js')


var ex = module.exports = {};


var detective = (constelacion, nivel) => {
    return new Promise((resolve, reject) => {
        constelacion.getSubConstelaciones()
        .then(response => Promise.all(response.map(async(n) => await detective(n, nivel + 1))))
        .then((response) => resolve({
            nivel : nivel,
            constelacion : constelacion,
            hijos : response
        }))
    })
}

var arbol = (array, item) =>
    Object.assign(item , {
        hijos :  array.filter((v) =>  {
            if(item.id === v.IdConstelacion){
                arbol(array, v)
                return v.get({plain : true})
            }
        })
    })

//
// async function detective(contelacion, array){
//     return !_.isNull(contelacion) ? await contelacion.getSubConstelaciones()
//     .then(response => {
//         array.push(contelacion)
//         return detective(response, array)
//     }) : array
// }

ex.alternativa = (req, res, next) => {

    Promise.all([

        galaxia.findAll({
            include : [
                {
                    model : constelacion,
                    as : 'Constelaciones'
                }
            ]
        }),
        dimension.findAll({
            include : [
                {
                    model : constelacion,
                    as : 'SubDimension'
                }
            ]
        })
    ])
    .then(response => {

        let galaxias = response[0]
        let dimensiones = response[1].map(n =>
            Object.assign(n.SubDimension, { IdConstelacion : n.IdPreConstelacion })).forEach(n => {

                // console.log(n.get({plain : true}))

                let idx = galaxias[n.IdGalaxia - 1].Constelaciones.findIndex(s => (s.id === n.id && s.IdConstelacion === null))
                galaxias[n.IdGalaxia - 1].Constelaciones.push(n)
                if(idx > -1)
                    galaxias[n.IdGalaxia - 1].Constelaciones.splice(idx  , 1)


            })
        return galaxias
    })
    .then(galaxias => { Promise.all(
            galaxias.map( async (galaxia) =>  {

                const arboldeconstelaciones = await galaxia.Constelaciones.filter(n =>
                    _.isNull(n.IdConstelacion)).map(n =>
                        arbol(galaxia.Constelaciones, n))

                vialactea()[galaxia.nombre](arboldeconstelaciones)

                Promise.all(
                    galaxia.Constelaciones.filter(n => _.isNull(n.IdConstelacion) || n.tipo === 'ficha').map(async (n) =>
                        await detective(n, 1))
                ).then(async estela => {

                    // if(galaxia.id === 1)
                    //     res.status(200).jsonp(estela)

                    const constelaciones = {
                        [Symbol.asyncIterator]: async function* (array, link, nivel) {
                            for (const n of array){

                                const bitacora = mapa(n)

                                const guiaestelar = await supernova(n, link, galaxia.nombre, nivel)
                                if(n.status === 0){
                                    await bitacora.controlador(guiaestelar.controlador, n, nivel, galaxia.nombre)
                                    await bitacora.estilo(guiaestelar.estilo, n, nivel, galaxia.nombre)
                                    await bitacora.plantilla(guiaestelar.plantilla, n, nivel, galaxia.nombre)
                                }
                                if((nivel === 1 || n.tipo === 'ficha'|| n.tipo === 'perfil'|| n.tipo === 'vista') && n.status !== 2){
                                    await bitacora.modulo(guiaestelar.modulo, n, nivel, galaxia.nombre, estela, galaxia.Constelaciones)
                                }
                                yield [ n,  guiaestelar.link, guiaestelar.nivel ]

                            }
                        }
                    }

                    await (async function recursion(array, link, nivel){
                        for await (const arg of constelaciones[ Symbol.asyncIterator ](array, link, nivel)){
                            let planeta = arg[0]
                            recursion(planeta.hijos, arg[1], arg[2])
                        }
                    })(arboldeconstelaciones, '/', 1)


                })

            })

        )

        res.status(200).jsonp(galaxias)

    })


}
