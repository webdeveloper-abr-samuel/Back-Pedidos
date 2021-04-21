const appusers = require('../../models').appusers;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
LoginController = {};


const isValidPassword = async (res,asesor,distribuidor,profile,password, hashDB) => {
    textContent = password.toString();
    const compare = await bcrypt.compare(textContent, hashDB, (e, result) => {
        if (result) {
            jwt.sign({asesor,distribuidor,profile, expiresIn: process.env.JWT_EXPIRES_IN  }, process.env.SECRETKEY, (e, token) => {
                res.status(200).json({
                    message: 'Autenticado con Exito',
                    token,
                    asesor,
                    profile
                });
            });

        } else {
            res.status(401).json({
                message: 'Contraseña Invalida'
            })
        }
    });
    return compare
}


LoginController.login = async (req, res) => {
    const { email, password } = req.body
    try {
        let result = await appusers.findOne({
            attributes: ['email', 'password', 'asesor','distribuidor', 'profile'],
            where: {
                email
            }
        });

        if (result !=  undefined) {
            const passworBD = result.password;
            const asesor = result.asesor;
            const profile = result.profile;
            const distribuidor = result.distribuidor
            isValidPassword(res,asesor,distribuidor,profile,password,passworBD);
        }else{
            return res.status(401).json({
                message: 'Correo Invalido'
            });
        }    

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = LoginController;
