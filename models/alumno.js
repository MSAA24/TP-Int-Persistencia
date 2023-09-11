'use strict';
module.exports = (sequelize, DataTypes) => {
    const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    }, {tableName: 'alumnos'});
    
    return alumno;
};