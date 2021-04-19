'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gestiondiaria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venta: {
        type: Sequelize.STRING
      },
      noVenta: {
        type: Sequelize.STRING
      },
      valorPedido: {
        type: Sequelize.INTEGER
      },
      obsVenta: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      Latitude: {
        type: Sequelize.STRING
      },
      Longitude: {
        type: Sequelize.STRING
      },
      savedBy: {
        type: Sequelize.STRING
      },
      ingresoFH: {
        type: Sequelize.DATEONLY
      },
      imgRuta: {
        type: Sequelize.STRING
      },
      taskID: {
        type: Sequelize.INTEGER
      },
      form: {
        type: Sequelize.STRING
      },
      vendedor: {
        type: Sequelize.STRING
      },
      distribuidor: {
        type: Sequelize.STRING
      },
      prodAbrVen: {
        type: Sequelize.TEXT
      },
      asesordistribuidor: {
        type: Sequelize.STRING
      },
      razonRechazo: {
        type: Sequelize.STRING
      },
      obsDistribuidor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('gestiondiaria');
  }
};