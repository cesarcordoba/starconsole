module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('meteoros', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	nombre: Sequelize.STRING,
        tipo: Sequelize.STRING,
    },{
    	name : {
    		singular: 'meteoro',
    		plural: 'meteoros'
        }
	})
