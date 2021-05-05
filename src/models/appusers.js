"use strict";
const { Model } = require("sequelize");
const { crypt } = require('../helpers/hashData');
const bcrypt = require('bcrypt');
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
      contrato: DataTypes.BOOLEAN,
      fechacontrato: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "appusers",
      hooks: {
        beforeCreate: async(AppUser) => {
          const { email, profile, password } = AppUser
          var hash = await bcrypt.hash(password,12);
          // Encrypt        
          User.email = crypt(email);
          User.profile = crypt(profile);
          User.password = hash;
        }
      }
    }
  );
  return appusers;
};
