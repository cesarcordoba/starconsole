module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('dimensiones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	nombre: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
    },{
    	name : {
    		singular: 'dimension',
    		plural: 'dimensiones'
        }
	})
