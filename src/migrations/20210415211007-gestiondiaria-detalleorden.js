'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let model = 'detalleordens'

    const addGestionDiaria = await queryInterface.addColumn(
      model,
      'idGestion',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'gestiondiaria',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        after: 'id'
      }
    );

    return `${addGestionDiaria}`;
  },

  down: async (queryInterface, Sequelize) => {
    const removeRelations = async () => {
      const model = 'detalleordens'
      await queryInterface.removeColumn(
        model,
        'idGestion'
      );
    }

    return removeRelations();
  }
};
