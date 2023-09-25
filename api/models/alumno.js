'use strict';
module.exports = (sequelize, DataTypes) => {
    const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    }, {tableName: 'alumnos'});

    alumno.associate = function(models) {    
        //asociacion a carrera (pertenece a:)
        alumno.hasMany(models.inscripcion// modelo al que pertenece
        ,{
          as : 'inscripcion',  // nombre de mi relacion
          foreignKey: 'id_alumno'     // campo con el que voy a igualar
        })
    }
    return alumno;
};