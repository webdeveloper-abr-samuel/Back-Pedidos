'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fichaclientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreNegocio: {
        type: Sequelize.STRING
      },
      estrato: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      contacto: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      departamento: {
        type: Sequelize.STRING
      },
      ciudadPoblacion: {
        type: Sequelize.STRING
      },
      territorio: {
        type: Sequelize.STRING
      },
      nroComunazona: {
        type: Sequelize.STRING
      },
      nombreComZon: {
        type: Sequelize.STRING
      },
      barrio: {
        type: Sequelize.STRING
      },
      clasificacion: {
        type: Sequelize.STRING
      },
      tipologia: {
        type: Sequelize.STRING
      },
      ordenRuta: {
        type: Sequelize.STRING
      },
      comentarios: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      creadoPor: {
        type: Sequelize.STRING
      },
      creacionFH: {
        type: Sequelize.DATEONLY
      },
      modificadoPor: {
        type: Sequelize.STRING(20)
      },
      modificacionFH: {
        type: Sequelize.DATEONLY
      },
      pubExte: {
        type: Sequelize.STRING(2)
      },
      pubInte: {
        type: Sequelize.STRING(2)
      },
      exhibi: {
        type: Sequelize.STRING(2)
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      gooSitioId: {
        type: Sequelize.STRING(400)
      },
      foto: {
        type: Sequelize.STRING(900)
      },
      origenDatos: {
        type: Sequelize.STRING(45)
      },
      prodAbrasivos: {
        type: Sequelize.STRING(500)
      },
      lineasS: {
        type: Sequelize.STRING
      },
      promCompr: {
        type: Sequelize.STRING
      },
      UnCorteF: {
        type: Sequelize.STRING
      },
      marcas: {
        type: Sequelize.STRING
      },
      unFlapD: {
        type: Sequelize.STRING
      },
      marcasFD: {
        type: Sequelize.STRING
      },
      promLS: {
        type: Sequelize.STRING
      },
      maLijS: {
        type: Sequelize.STRING
      },
      numVerParPer: {
        type: Sequelize.STRING
      },
      canal: {
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
    await queryInterface.dropTable('fichaclientes');
  }
};