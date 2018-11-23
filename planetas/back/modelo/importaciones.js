const _ = require('lodash');

module.exports = (planeta, documento, modelo, chain, key) =>
    new Promise(resolve => {

    if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 4 || planeta.orbitas.tipo === 2){
    documento.write(`
import { `+ _.capitalize(planeta.singular) +` } from '../`+ planeta.singular +`/modelo';`)
        chain.then(response => resolve(_.concat(response, planeta.singular )))
}

    if(planeta.orbitas.tipo === 6 || planeta.orbitas.tipo === 5 || planeta.orbitas.tipo === 3){
        chain.then(response => resolve(_.concat(response, planeta.singular )))
}

    if(planeta.orbitas.tipo === 7){

        documento.write(`
import { `+ _.capitalize(planeta.singular) +` } from '../`+ planeta.singular +`/modelo';`)

    planeta.getSubPlanetas()
    .then(planetas =>
        planetas.forEach(planetax => {

            if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){


            chain.then(response => {

                if(!response.includes(planetax.singular)){

                documento.write(`
import { `+ _.capitalize(planetax.singular) +` } from '../`+ planetax.singular +`/modelo';`)

                }

                resolve(_.concat(response, planeta.singular, planetax.singular   ))

                })

            }
        })
    )

}


})
