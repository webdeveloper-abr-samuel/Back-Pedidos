'use strict';
const { crypt } = require('../helpers/hashData');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gestiondiaria', [{
      idCliente: 1,
      idEstado: 1,
      venta: "no",
      noVenta: "Mucho inventario",
      valorPedido: crypt("1000"),
      obsVenta: crypt("sin observaciones"),
      nit: crypt("1130642863-7"),
      Latitude: crypt("33.3764702"),
      Longitude: crypt("-76.5155619"),
      savedBy: crypt("KORDONEZ"),
      ingresoFH: "2021-04-28",
      imgRuta: "1130642863-7_59.jpg",
      taskID: "59",
      form: "dailyJob",
      vendedor: crypt("Yurani"),
      distribuidor: "Hottostools",
      prodAbrVen: crypt(""),
      asesordistribuidor: "Hottostools",
      razonRechazo: crypt("Monto insuficiente"),
      obsDistribuidor: crypt("Monto insuficiente")
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('gestiondiaria', null, {});
  }
};
