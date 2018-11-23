module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('orbitas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	nombre: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
        alias: Sequelize.STRING,
    },{
    	name : {
    		singular: 'orbita',
    		plural: 'orbitas'
        }
	})
