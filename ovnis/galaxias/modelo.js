module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('galaxias', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	nombre: Sequelize.STRING,
        tipo: Sequelize.STRING,
    },{
    	name : {
    		singular: 'constelacion',
    		plural: 'constelaciones'
        }
	})
