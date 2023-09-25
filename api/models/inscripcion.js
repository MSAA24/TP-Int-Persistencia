'use strict';
module.exports = (sequelize, DataTypes) => {
  const inscripcion = sequelize.define('inscripcion', {
    id_alumno: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {tableName: 'inscripciones'});
  
  
  inscripcion.associate = function(models) {
    inscripcion.belongsTo(models.materia,  // Modelo al que pertenece
    {
        as: 'Inscripcion-Materia-Relacion',                
        foreignKey: 'id_materia'      
    }),

    inscripcion.belongsTo(models.alumno,  
    {
        as: 'Inscripcion-Alumno-Relacion',          
        foreignKey: 'id_alumno'       
    })
  };
  
  return inscripcion;
};