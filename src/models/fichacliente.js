'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fichacliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  fichacliente.init({
    nombreNegocio: DataTypes.STRING,
    estrato: DataTypes.STRING,
    nit: DataTypes.STRING,
    telefono: DataTypes.STRING,
    contacto: DataTypes.STRING,
    cargo: DataTypes.STRING,
    correo: DataTypes.STRING,
    pais: DataTypes.STRING,
    departamento: DataTypes.STRING,
    ciudadPoblacion: DataTypes.STRING,
    territorio: DataTypes.STRING,
    nroComunazona: DataTypes.STRING,
    nombreComZon: DataTypes.STRING,
    barrio: DataTypes.STRING,
    clasificacion: DataTypes.STRING,
    tipologia: DataTypes.STRING,
    ordenRuta: DataTypes.STRING,
    comentarios: DataTypes.STRING,
    direccion: DataTypes.STRING,
    creadoPor: DataTypes.STRING,
    creacionFH: DataTypes.DATEONLY,
    modificadoPor: DataTypes.STRING,
    modificacionFH: DataTypes.DATEONLY,
    pubExte: DataTypes.STRING,
    pubInte: DataTypes.STRING,
    exhibi: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    gooSitioId: DataTypes.STRING,
    foto: DataTypes.STRING,
    origenDatos: DataTypes.STRING,
    prodAbrasivos: DataTypes.STRING,
    lineasS: DataTypes.STRING,
    promCompr: DataTypes.STRING,
    UnCorteF: DataTypes.STRING,
    marcas: DataTypes.STRING,
    unFlapD: DataTypes.STRING,
    marcasFD: DataTypes.STRING,
    promLS: DataTypes.STRING,
    maLijS: DataTypes.STRING,
    numVerParPer: DataTypes.STRING,
    canal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fichacliente',
  });
  return fichacliente;
};