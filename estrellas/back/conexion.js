var fs = require('fs');
const _ = require('lodash');


module.exports = (data, documento) => {
return new Promise(resolve => {
data.map(modelo =>
    documento.write(`
import { ` + _.capitalize(modelo.singular) + ` } from './` + modelo.singular + `/modelo';`))
documento.write(`

import { Sequelize } from 'sequelize-typescript';
import { config } from '../conf/config';

export class Conexion extends Sequelize{

    constructor() {
        super({
            database: config.db.database,
            dialect: 'mysql',
            username: config.db.username,
            password: config.db.password,
            host: config.db.host,
            port: config.db.port,
            modelPaths: [`)
            //
            // data.map(modelo => documento.write(`
            //     __dirname + '/` + modelo.singular + `/modelo',`))

            documento.write(`],
            operatorsAliases: true
        });


`)

documento.write(`
    }
}`, (algo) => resolve(true))
    })
}
