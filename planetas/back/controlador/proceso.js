const _ = require('lodash');

module.exports = (documento, modelo, planeta) =>
new Promise((resolve, reject) => {

    if(planeta.orbitas.tipo === 1){
            documento.write(`
    //* `+ planeta.id + `
    x` + planeta.singular + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findAll(
            { where : { 'Id` + _.capitalize(planeta.singular) + `' : req.params.id } }
            )
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'x`+ _.capitalize(modelo.singular) + planeta.plural + `'))

    //* `+ planeta.id + `
    ` + planeta.singular + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.id )
            .then(item => item.$get('`+  _.capitalize(planeta.singular)  +`'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, '`+ _.capitalize(modelo.singular) + planeta.plural + `'))


    `)

        resolve(true)
    }

    if(planeta.orbitas.tipo === 3 || planeta.orbitas.tipo ===  2 || planeta.orbitas.tipo ===  4){
        documento.write(`
    //* `+ planeta.id + `
    ` + planeta.plural + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
            .then(item => item.$get('`+  ( planeta.orbitas.tipo ===  3 ? _.capitalize(planeta.singular) : _.capitalize(planeta.plural) )  +`'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, '`+ _.capitalize(modelo.singular) + planeta.plural + `'))

    //* `+ planeta.id + `
    ligar` + planeta.plural + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.` + modelo.singular + `)
            .then(item => item.$add('`+  ( planeta.orbitas.tipo ===  3 ? _.capitalize(planeta.singular) : _.capitalize(planeta.plural) )  + `', req.params.` + planeta.singular + `))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligar`+ _.capitalize(modelo.singular) + planeta.plural + `'))

    //* `+ planeta.id + `
    desligar` + planeta.plural + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.` + modelo.singular + `)
            .then(item => item.$remove('`+  ( planeta.orbitas.tipo ===  3 ? _.capitalize(planeta.singular) : _.capitalize(planeta.plural) )  +`', req.params.` + planeta.singular + `))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligar`+ _.capitalize(modelo.singular) + planeta.plural + `'))

    `)

        resolve(true)
    }



    if(planeta.orbitas.tipo === 7){

        planeta.getSubPlanetas()
        .then(planetas => {
            planetas.forEach(planetax => {

                if(planetax.orbitas.tipo === 5 && planetax.id !== modelo.id){

                    documento.write(`
    //* `+ planeta.id + `
    ` + _.toLower(planetax.orbitas.alias) + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
            .then(item => item.$get('`+  planetax.orbitas.alias  +`'))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, '`+ _.capitalize(modelo.singular) + planetax.orbitas.alias + `'))

    //* `+ planeta.id + `
    ligar` + _.toLower(planetax.orbitas.alias) + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.` + modelo.singular + `)
            .then(item => item.$add('`+  planetax.orbitas.alias  + `', req.params.` + planetax.singular + `))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'ligar`+ _.capitalize(modelo.singular) + planetax.orbitas.alias + `'))

    //* `+ planeta.id + `
    desligar` + _.toLower(planetax.orbitas.alias) + ` = (req: Request, res: Response, next: NextFunction) =>
        `+ _.capitalize(modelo.singular) +`.findById(req.params.` + modelo.singular + `)
            .then(item => item.$remove('`+  planetax.orbitas.alias  +`', req.params.` + planetax.singular + `))
            .then(result => res.status(200).jsonp(result))
            .catch(err => errorHandler(err, 'desligar`+ _.capitalize(modelo.singular) + planetax.orbitas.alias + `'))

                `)

                }


            })

            resolve(true)


        })

    }

    if(planeta.orbitas.tipo === 5){

        resolve(true)
    }

    if(planeta.orbitas.tipo === 6){

        documento.write(`

    //* `+ planeta.id + `
    sub` + planeta.plural + ` = (req: Request, res: Response, next: NextFunction) =>
    `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
        .then(item => item.$get('Sub`+  _.capitalize(planeta.plural) + `'))
        .then(result => res.status(200).jsonp(result))
        .catch(err => errorHandler(err, 'sub`+ _.capitalize(modelo.singular) + planeta.plural + `'))

    //* `+ planeta.id + `
    pre` + planeta.plural + ` = (req: Request, res: Response, next: NextFunction) =>
    `+ _.capitalize(modelo.singular) +`.findById(req.params.id)
        .then(item => item.$get('Pre`+  _.capitalize(planeta.plural) + `'))
        .then(result => res.status(200).jsonp(result))
        .catch(err => errorHandler(err, 'pre`+ _.capitalize(modelo.singular) + planeta.plural + `'))

        `)

        resolve(true)

    }
})
