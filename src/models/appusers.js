"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appusers extends Model {
    static associate(models) {}
  }
  appusers.init({
      asesor: DataTypes.STRING,
      distribuidor: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "appusers",
    }
  );
  return appusers;
};
