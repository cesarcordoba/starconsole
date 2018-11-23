module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('planetas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    	orden: Sequelize.INTEGER,
        plural: Sequelize.STRING,
        singular: Sequelize.STRING,
    },{
    	name : {
    		singular: 'planeta',
    		plural: 'planetas'
        }
	})
