const _ = require('lodash');

module.exports = (documento, modelo, planeta) =>
new Promise((resolve, reject) => {


    var tipo = planeta.get({plan : true}).orbitas.tipo

    if(tipo === 1){
        documento.write(`
    public static x` +  _.capitalize(planeta.singular)  + ` = id => axios.default.get( url + '/data/` +  modelo.singular  + `/x` +  _.capitalize(planeta.singular)  + `/' + id ).then(response => response.data.map(n => new `+ _.capitalize(modelo.singular) +`( n )))
    public static ` +  planeta.singular  + ` = id => axios.default.get( url + '/data/` +  modelo.singular  + `/` +  planeta.singular  + `/' + id ).then(response =>  new `+ _.capitalize(planeta.singular) +`( response.data ))
`)
    resolve(true)
}
    if(tipo === 3 || tipo ===  2 || tipo ===  4){
        documento.write(`
    public static ` +  planeta.plural  + ` = id => axios.default.get( url + '/data/` +  modelo.singular  + `/`+  planeta.plural  +`/' + id ).then(response => response.data.map(n => new `+ _.capitalize(planeta.singular) +`( n )))
    public static ligar` +  planeta.singular  + ` = (`+  modelo.singular  +` , ` +  planeta.singular  + `) => axios.default.put( url + '/data/` +  modelo.singular  + `-` +  planeta.singular  +`/' + `+  modelo.singular  +` + '/' + `+  planeta.singular  + ` )
    public static desligar` +  planeta.singular  + ` = (`+  modelo.singular  +` , ` +  planeta.singular  + `) => axios.default.delete( url + '/data/`+  modelo.singular  + `-` +  planeta.singular  +`/' + `+  modelo.singular  +` + '/' + `+  planeta.singular  +` )
`)
    resolve(true)
}

    if(tipo === 6){
    documento.write(`
    public static pre` +  planeta.plural  + ` = id => axios.default.get( url + '/data/` +  planeta.singular  + `/pre`+  planeta.plural  +`/' + id ).then(response => response.data.map(n => new `+ _.capitalize(planeta.singular) +`( n )))
    public static sub` +  planeta.plural  + ` = id => axios.default.get( url + '/data/` +  planeta.singular  + `/sub`+  planeta.plural  +`/' + id ).then(response => response.data.map(n => new `+ _.capitalize(planeta.singular) +`( n )))
`)
    resolve(true)
}
    if(tipo === 5){
    resolve(true)

}


    if(planeta.orbitas.tipo === 7){

        planeta.getSubPlanetas()
        .then(planetas => {
            planetas.forEach(planetax => {

                if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){

                    documento.write(`

    public static ` +  _.toLower(planetax.orbitas.alias) + ` = id => axios.default.get( url + '/data/`+ modelo.singular +`/` + planetax.orbitas.alias  + `/' + id ).then(response => response.data.map(n => new `+ _.capitalize(planetax.singular) +`( n )))
    public static ligar` + _.toLower(planetax.orbitas.alias)  + ` = (`+  modelo.singular  +` , ` +  planetax.singular  + `) => axios.default.put( url + '/data/` +  modelo.singular  + `-` +  planetax.singular  +`/' + `+  modelo.singular  +` + '/' + `+  planetax.singular  + ` )
    public static desligar` +  _.toLower(planetax.orbitas.alias)  + ` = (`+  modelo.singular  +` , ` +  planetax.singular  + `) => axios.default.delete( url + '/data/`+  modelo.singular  + `-` +  planetax.singular  +`/' + `+  modelo.singular  +` + '/' + `+  planetax.singular  +` )

    `)

                }


            })
            resolve(true)
        })
    }

})
