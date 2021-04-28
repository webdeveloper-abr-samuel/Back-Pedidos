const appusers = require("../models").appusers;
const bcrypt = require("bcrypt");
userController = {};

userController.get = async (req, res) => {
  try {
    let result = await appusers.findAll();
    return res.status(200).json({
      result,
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

userController.post = async (req, res) => {
  const { email, password, asesor, distribuidor,profile } = req.body;

  const hash = await bcrypt.hash(password, 12);

  try {
    await appusers.create({
      asesor,
      distribuidor,
      email,
      password: hash,
      profile,
    });
    return res.status(200).json({
      message: "Usuario Guardado Exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = userController;
