'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('inscripciones', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        id_alumno: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        id_materia: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('inscripciones');
    }
};