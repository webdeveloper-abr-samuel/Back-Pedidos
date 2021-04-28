"use strict";
const { Model } = require("sequelize");
const { crypt } = require("../helpers/hashData");
module.exports = (sequelize, DataTypes) => {
  class gestiondiaria extends Model {
    static associate(models) {
      gestiondiaria.belongsTo(models.estados, {
        foreignKey: "idEstado",
        as: "estados",
      });

      gestiondiaria.belongsTo(models.fichacliente, {
        foreignKey: "idCliente",
        as: "fichacliente",
      });

      gestiondiaria.hasMany(models.detalleorden, {
        foreignKey: "idGestion",
        as: "detalleorden",
      });
    }
  }
  gestiondiaria.init(
    {
      idCliente: DataTypes.INTEGER,
      idEstado: DataTypes.INTEGER,
      venta: DataTypes.STRING,
      noVenta: DataTypes.STRING,
      valorPedido: DataTypes.INTEGER,
      obsVenta: DataTypes.STRING,
      nit: DataTypes.STRING,
      Latitude: DataTypes.STRING,
      Longitude: DataTypes.STRING,
      savedBy: DataTypes.STRING,
      ingresoFH: DataTypes.DATEONLY,
      imgRuta: DataTypes.STRING,
      taskID: DataTypes.INTEGER,
      form: DataTypes.STRING,
      vendedor: DataTypes.STRING,
      distribuidor: DataTypes.STRING,
      prodAbrVen: DataTypes.TEXT,
      asesordistribuidor: DataTypes.STRING,
      razonRechazo: DataTypes.STRING,
      obsDistribuidor: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "gestiondiaria",
      hooks: {
        beforeCreate: async (GestionDiaria) => {
          const {
            valorPedido,
            obsVenta,
            nit,
            Latitude,
            Longitude,
            savedBy,
            vendedor,
            distribuidor,
            prodAbrVen,
            asesordistribuidor,
            razonRechazo,
            obsDistribuidor,
          } = GestionDiaria;
          // Encrypt
          GestionDiaria.nit = crypt(nit);
          GestionDiaria.valorPedido = crypt(valorPedido);
          GestionDiaria.obsVenta = crypt(obsVenta);
          GestionDiaria.Latitude = crypt(Latitude);
          GestionDiaria.Longitude = crypt(Longitude);
          GestionDiaria.savedBy = crypt(savedBy);
          GestionDiaria.vendedor = crypt(vendedor);
          GestionDiaria.distribuidor = crypt(distribuidor);
          GestionDiaria.prodAbrVen = crypt(prodAbrVen);
          GestionDiaria.asesordistribuidor = crypt(asesordistribuidor);
          GestionDiaria.razonRechazo = crypt(razonRechazo);
          GestionDiaria.obsDistribuidor = crypt(obsDistribuidor);
        },
      },
    }
  );
  return gestiondiaria;
};
