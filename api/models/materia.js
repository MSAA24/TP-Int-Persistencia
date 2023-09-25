'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {tableName: 'materias'});
  
  materia.associate = function(models) {
    

  	//asociacion a carrera (pertenece a:)
  	materia.belongsTo(models.carrera// modelo al que pertenece
    ,{
      as : 'Carrera-Relacionada',  // nombre de mi relacion
      foreignKey: 'id_carrera'     // campo con el que voy a igualar
    }),
    materia.hasMany(models.inscripcion,// modelo al que pertenece
    {
      as : 'inscripcion',  
      foreignKey: 'id_materia'     
    })
  };


  return materia;
};