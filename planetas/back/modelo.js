const _ = require('lodash');

const importaciones = require('./modelo/importaciones.js');
const proceso = require('./modelo/proceso.js');


module.exports = (documento, modelo) => {
return new Promise((resolve) => {

documento.write(`

import { Table, Column, Model, HasMany, HasOne, BelongsTo, BelongsToMany, DataType,  ForeignKey} from 'sequelize-typescript';`)


modelo.SubPlanetas.reduce(
    (chain, planeta, key) => chain.then(() => importaciones(planeta, documento, modelo, chain, key)),
    Promise.resolve([ modelo.singular ])
)
.then(() => modelo.getMeteoros())
.then((meteoros) => {

documento.write(`

@Table({
    timestamps: true,
    tableName: '` + modelo.plural  + `'
})
export class `+ _.capitalize(modelo.singular) +` extends Model<`+ _.capitalize(modelo.singular) +`> {

    @Column({primaryKey: true, autoIncrement:true})
    id: number;

`)


meteoros.forEach(meteoro =>
    documento.write(`

    @Column(DataType.` +  meteoro.tipo +`)
    ` + meteoro.nombre + ` : ` +  data(meteoro.tipo) + `;

`))

})
.then(() => Promise.all(
    modelo.SubPlanetas.map(async (planeta) => await proceso(documento, modelo, planeta))
))
.then(() => {

        documento.write(`

    constructor(values?: any, options?: any) {
        super(values, options);
    }
}`, (algo) => resolve(true))

        })

    })
}

function data(tipo){

    switch (tipo) {
        case 'string':
            return 'string'
            break;
        case 'INTEGER':
            return 'number'
            break;
        case 'TEXT':
            return 'string'
            break;
        default:

    }

}
