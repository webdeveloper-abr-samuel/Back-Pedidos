'use strict';
const { crypt } = require('../helpers/hashData');
const bcrypt = require('bcrypt');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('appusers', [{
      asesor: crypt("mateo"),
      distribuidor: crypt("ABRACOL"), 
      email: "mateo@abracol.com",
      password: await bcrypt.hash('123456',12),
      profile: crypt(1)
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('appusers', null, {});
  }
};
