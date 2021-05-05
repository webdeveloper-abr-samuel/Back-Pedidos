'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appusers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asesor : {
        type: Sequelize.STRING(100)
      },
      distribuidor: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(25),
        unique: true
      },
      password: {
        type: Sequelize.STRING(100)
      },
      profile: {
        type: Sequelize.FLOAT
      },
      contrato:{
        type: Sequelize.BOOLEAN
      },
      fechacontrato: {
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appusers');
  }
};