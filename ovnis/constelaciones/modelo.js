module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('constelaciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	nombre: Sequelize.STRING,
        tipo: Sequelize.STRING,
        status: Sequelize.INTEGER,
    },{
    	name : {
    		singular: 'constelacion',
    		plural: 'constelaciones'
        }
	})
