const _ = require('lodash');

module.exports = (documento, modelo, planeta) =>
new Promise((resolve, reject) => {

    if(planeta.orbitas.tipo === 1){
        documento.write(`
        this._rutas.route('/data/`+ modelo.singular +`/x` + _.capitalize(planeta.singular) + `/:id')
            .get(this.controlador.x`+ planeta.singular + `)

        this._rutas.route('/data/`+ modelo.singular +`/` + _.capitalize(planeta.singular) + `/:id')
            .get(this.controlador.`+ planeta.singular + `)

        `)
        resolve(true)
    }

    if(planeta.orbitas.tipo === 3 || planeta.orbitas.tipo ===  2 || planeta.orbitas.tipo ===  4){
        documento.write(`

        //*
        this._rutas.route('/data/`+ modelo.singular +`/` + planeta.plural  + `/:id')
            .get(this.controlador.` +  planeta.plural + `)

        //*
        this._rutas.route('/data/`+ modelo.singular +`-` + planeta.singular + `/:` + modelo.singular + `/:` + planeta.singular + `')
            .put(this.controlador.ligar`+ planeta.plural +`)
            .delete(this.controlador.desligar`+ planeta.plural +`)

        `)
        resolve(true)
    }

    if(planeta.orbitas.tipo === 5){
        resolve(true)

    }


    if(planeta.orbitas.tipo === 6){


        documento.write(`

        //*
        this._rutas.route('/data/`+ modelo.singular +`/sub` + planeta.plural  + `/:id')
            .get(this.controlador.sub` +  planeta.plural + `)

        //*
        this._rutas.route('/data/`+ modelo.singular +`/pre` + planeta.plural  + `/:id')
            .get(this.controlador.pre`+ planeta.plural +`)

    `)



        resolve(true)

    }

    if(planeta.orbitas.tipo === 7){

        planeta.getSubPlanetas()
        .then(planetas => {
            planetas.forEach(planetax => {

                if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){

                    documento.write(`
        //*
        this._rutas.route('/data/`+ modelo.singular +`/` + planetax.orbitas.alias  + `/:id')
            .get(this.controlador.` + _.toLower(planetax.orbitas.alias) + `)

        //*
        this._rutas.route('/data/`+ modelo.singular +`-` + planetax.singular + `/:` + modelo.singular + `/:` + planetax.singular + `')
            .put(this.controlador.ligar`+ _.toLower(planetax.orbitas.alias) +`)
            .delete(this.controlador.desligar`+ _.toLower(planetax.orbitas.alias) +`)

                `)

                }


            })
            resolve(true)
        })
    }




})
