'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('estados', [
    {
      name: 'Proceso'
    }, {
      name: 'Despachado'
    }, {
      name: 'NoDespachado'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('estados', null, {});
  }
};
