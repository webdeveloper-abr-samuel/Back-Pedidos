const appusers = require('../../models').appusers;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
LoginController = {};


const isValidPassword = async(res, asesor, distribuidor, profile, password, hashDB) => {
    textContent = password.toString();
    const compare = await bcrypt.compare(textContent, hashDB, (e, result) => {
        if (result) {
            jwt.sign({ asesor, distribuidor, profile, expiresIn: process.env.JWT_EXPIRES_IN }, process.env.SECRETKEY, (e, token) => {
                res.status(200).json({
                    message: 'Autenticado con Exito',
                    token,
                    asesor,
                    profile
                });
            });
        } else {
            res.status(401).json({
                message: 'Usuario o Contraseña Invalido'
            })
        }
    });
    return compare
}

LoginController.login = async(req, res) => {
    const { email, password } = req.body
    try {
        let result = await appusers.findOne({
            attributes: ['email', 'password', 'asesor', 'distribuidor', 'profile','contrato'],
            where: {
                email
            }
        });

        if (result != undefined) {
            if (result.contrato == true) {
                const passworBD = result.password;
                const asesor = result.asesor;
                const profile = result.profile;
                const distribuidor = result.distribuidor
                isValidPassword(res, asesor, distribuidor, profile, password, passworBD);
            }else {
                return res.status(401).json({
                    message: 'Acepte nuestras politicas sobre el manejo de datos para continuar'
                });
            }
        } else {
            return res.status(401).json({
                message: 'Usuario o Contraseña Invalido'
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

LoginController.update = async(req, res) => {
    const { email } = req.body;
    var hoy = new Date();
    var fecha = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
    var hora = (hoy.getUTCHours()-5)+':'+hoy.getMinutes();
    var fechaYHora = fecha+' '+hora;
    try {
        let data = await appusers.update({
            contrato: 1,
            fechacontrato: fechaYHora
        }, {
            where: {
                email
            },
        });
        return res.status(200).json({
            data,
            message: "Dato Actualizado correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

LoginController.postTerminos = async(req, res) => {
    const { email,password } = req.body;
    let textContent = password.toString();
    
    
    try {
        let data = await appusers.findOne({
            attributes: ["contrato", "password"],
            where: {
                email
            },
        });

        await bcrypt.compare(textContent, data.password, (e, result) => {
            if (result) {
                return res.status(200).json({
                    data: data.contrato,
                    message: "Datos correctamente",
                });
            }else{
                res.status(401).json({
                    message: 'Usuario o Contraseña Invalido'
                })
            }
        })
    } catch (error) {
        return res.status(401).json({
            error: 'Usuario o Contraseña Invalido',
        });
    }
};

module.exports = LoginController;