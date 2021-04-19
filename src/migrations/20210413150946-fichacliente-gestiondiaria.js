'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let model = 'gestiondiaria'

    const addFichaCliente = await queryInterface.addColumn(
      model,
      'idCliente',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'fichaclientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        after: 'id'
      }
    );

    const addEstados = await queryInterface.addColumn(
      model,
      'idEstado',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'estados',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        after: 'id'
      }
    );

    return `${addFichaCliente} ${addEstados}`;
  },

  down: async (queryInterface, Sequelize) => {
    const removeRelations = async () => {
      const model = 'gestiondiaria'
      await queryInterface.removeColumn(
        model,
        'idCliente'
      );
      await queryInterface.removeColumn(
        model,
        'idEstado'
      );
    }

    return removeRelations();
  }
};
