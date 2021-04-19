'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalleorden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detalleorden.belongsTo(models.gestiondiaria, {
        foreignKey: "idGestion",
        as: "gestiondiaria",
      });
    }
  };
  detalleorden.init({
    idGestion: DataTypes.INTEGER,
    code: DataTypes.STRING,
    referencia: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detalleorden',
  });
  return detalleorden;
};