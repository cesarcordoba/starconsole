const _ = require('lodash');
var fs = require('fs');

const { planeta, constelacion, orbita } = require('../ovnis/relaciones');


module.exports = (constelacion, link, modulo, nivel) =>
    new Promise(resolve => {

        if(constelacion.status === 0){
            var basica

            if(constelacion.tipo === 'ficha'){
                link = '/compartidos/'
                nivel = 2
            }

            basica = '../1.-frontend/src/app/modulos/' + modulo
            if (!fs.existsSync(basica + link + constelacion.nombre)){
                fs.mkdirSync(basica + link + constelacion.nombre)
            }

            let nuevolink = link + constelacion.nombre + '/'

            resolve({
                nivel : nivel + 1,
                link : nuevolink,
                controlador : escribir(basica + link + constelacion.nombre + '/' + constelacion.nombre + '.component.ts'),
                estilo :  escribir(basica + link + constelacion.nombre  + '/' +  constelacion.nombre + '.component.styl'),
                plantilla :  escribir(basica + link + constelacion.nombre + '/' + constelacion.nombre + '.component.pug'),
                modulo :  escribir(basica + link + constelacion.nombre + '/' +  constelacion.nombre + '.module.ts')
            })
        }

        else{

            let obj = {
                nivel : nivel + 1,
                link : link + constelacion.nombre + '/',
            }

            var basica = '../1.-frontend/src/app/modulos/' + modulo

            if( (constelacion.tipo === 'perfil' || constelacion.tipo === 'vista') && constelacion.status !== 2  ){


                obj.modulo =  escribir(basica + link + constelacion.nombre + '/' +  constelacion.nombre + '.module.ts')
            }

            if(constelacion.tipo === 'ficha' && constelacion.status !== 2  ){

                obj.modulo =  escribir(basica + '/compartidos/' + constelacion.nombre + '/' +  constelacion.nombre + '.module.ts')

            }

            resolve(obj)

        }

})

var escribir = (url) => fs.createWriteStream(url)
