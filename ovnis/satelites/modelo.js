module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('satelites', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        status: Sequelize.INTEGER,
        tipo: Sequelize.STRING,
        params: Sequelize.STRING,
    	nombre: Sequelize.STRING,
        ruta_back: Sequelize.STRING,
        ruta_front: Sequelize.STRING,
        descripcion: Sequelize.TEXT,
        contenido: Sequelize.TEXT
    },{
    	name : {
    		singular: 'satelite',
    		plural: 'satelites'
        }
	})
