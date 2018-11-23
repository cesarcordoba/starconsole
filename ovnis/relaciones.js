var conector = require('./conexion.js')

var planeta = require('./planetas/modelo')(conector);
var constelacion = require('./constelaciones/modelo')(conector);
var orbita = require('./orbitas/modelo')(conector);
var galaxia = require('./galaxias/modelo')(conector);
var meteoro = require('./meteoros/modelo')(conector);
var dimension = require('./dimensiones/modelo')(conector);
var satelite = require('./satelites/modelo')(conector);

planeta.hasMany(constelacion, { as : 'Constelaciones', foreignKey:'IdPlaneta'});
constelacion.belongsTo(planeta, { as : 'Planeta', foreignKey:'IdPlaneta'});

constelacion.hasMany(constelacion, { as : 'SubConstelaciones', foreignKey:'IdConstelacion'});
constelacion.belongsTo(constelacion, { as : 'PreConstelacion', foreignKey:'IdConstelacion'});

constelacion.belongsToMany(constelacion, {as: 'SubDimensiones', through: dimension, foreignKey: 'IdPreConstelacion'})
constelacion.belongsToMany(constelacion, {as: 'PreDimensiones', through: dimension, foreignKey: 'IdSubConstelacion'})

dimension.belongsTo(constelacion, { as : 'SubDimension', foreignKey:'IdSubConstelacion'});
dimension.belongsTo(constelacion, { as : 'PreDimension', foreignKey:'IdPreConstelacion'});

planeta.belongsToMany(planeta, {as: 'PrePlanetas', through: orbita, foreignKey: 'IdSubPlaneta'})
planeta.belongsToMany(planeta, {as: 'SubPlanetas', through: orbita, foreignKey: 'IdPrePlaneta'})

galaxia.hasMany(constelacion, { as : 'Constelaciones', foreignKey:'IdGalaxia'});
constelacion.belongsTo(galaxia, { as : 'Galaxia', foreignKey:'IdGalaxia'});

planeta.hasMany(meteoro, { as : 'Meteoros', foreignKey:'IdPlaneta'});
meteoro.belongsTo(planeta, { as : 'Planeta', foreignKey:'IdPlaneta'});

planeta.hasMany(satelite, { as : 'Satelites', foreignKey:'IdPlaneta'});
satelite.belongsTo(planeta, { as : 'Planeta', foreignKey:'IdPlaneta'});

module.exports = {
    planeta,
    constelacion,
    orbita,
    meteoro,
    galaxia,
    dimension,
    satelite
}
