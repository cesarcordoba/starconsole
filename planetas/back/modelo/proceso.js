const _ = require('lodash');

module.exports = (documento, modelo, planeta) =>
new Promise((resolve, reject) => {


    //BelongsTo, HasMany, HasOne
    if(planeta.orbitas.tipo === 1 || planeta.orbitas.tipo === 2 || planeta.orbitas.tipo === 3){

        documento.write(`

    @`+ planeta.orbitas.nombre +`(()=> `+ _.capitalize(planeta.singular) +`, 'Id`+ ( planeta.orbitas.tipo === 1 ? _.capitalize(planeta.singular) : _.capitalize(modelo.singular) ) +`')
    ` + (planeta.orbitas.tipo === 2 ? _.capitalize(planeta.plural) : _.capitalize(planeta.singular) ) + ` : ` +  _.capitalize(planeta.singular) + (planeta.orbitas.tipo === 2 ? `[];` : `;` )
        )

        if(planeta.orbitas.tipo === 1 ){

        documento.write(`

    @ForeignKey(() => `+ _.capitalize(planeta.singular) +`)
    @Column
    Id`+ _.capitalize(planeta.singular) +`: number;
    `)
        }
        resolve(true)
    }

    //BelongsToMany
    if(planeta.orbitas.tipo === 4){

            let menor = modelo.orden > planeta.orden ? modelo : planeta
            let mayor = modelo.orden > planeta.orden ? planeta : modelo

        documento.write(`

    @`+ planeta.orbitas.nombre +`(()=> `+ _.capitalize(planeta.singular) + `,'` +  mayor.plural + '' + menor.plural + `','Id` +  _.capitalize(modelo.singular) + `', 'Id`+ _.capitalize(planeta.singular) + `')
    ` +  _.capitalize(planeta.plural) + ` : ` +  _.capitalize(planeta.singular) + `[];`)

        resolve(true)

    }

    //Especial
    if(planeta.orbitas.tipo === 5){
        resolve(true)
    }

    //Recursiva
    if(planeta.orbitas.tipo === 6){

        documento.write(`

            @HasMany(()=> `+ _.capitalize(modelo.singular) +`, 'Id`+ _.capitalize(modelo.singular) +`')
            Sub`+ _.capitalize(modelo.plural) +` : `+ _.capitalize(modelo.singular) +`[];

            @BelongsTo(()=> `+ _.capitalize(modelo.singular) +`, 'Id`+ _.capitalize(modelo.singular) +`')
            Pre`+ _.capitalize(modelo.singular) +` : `+ _.capitalize(modelo.singular) +`[];

            @ForeignKey(() => `+ _.capitalize(modelo.singular) +`)
            @Column
            Id`+ _.capitalize(modelo.singular) +`: number;

            `)

        resolve(true)

    }

    //Nodo
    if(planeta.orbitas.tipo === 7){

        // Espacio
        documento.write(`
        `)

        planeta.getSubPlanetas()
        .then(planetas => { planetas.forEach(planetax => {

            if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){

                documento.write(`
    @BelongsToMany(()=> ` + _.capitalize(planetax.singular) + `, () => ` + _.capitalize(planeta.singular) + `,'Id` + _.capitalize(modelo.singular) + `', 'Id` + _.capitalize(planetax.singular) + `')
    ` + _.capitalize(planetax.orbitas.alias) + ` : ` + _.capitalize(planetax.singular) + `[];

            `)}

            })

            resolve(true)

        })

    }


})
