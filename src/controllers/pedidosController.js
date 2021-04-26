const gestiondiaria = require("../models").gestiondiaria;
const detalleorden = require("../models").detalleorden;
const fichacliente = require("../models").fichacliente;
const appusers = require("../models").appusers;
const estados = require("../models").estados;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
pedidosController = {};

pedidosController.get = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;

    var f = new Date();
    const mes = f.getMonth() + 1;
    const mesActual = mes < 10 ? `0${mes}` : mes;
    var date = f.getFullYear() + "-" + mesActual;
    try {
        if (profile == 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    asesordistribuidor: {
                        [Op.not]: null,
                    },
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    asesordistribuidor,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile != 4 && profile != 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getById = async(req, res) => {
    const id = req.params.id;
    try {
        let data = await gestiondiaria.findOne({
            attributes: ["razonRechazo", "obsDistribuidor"],
            where: {
                id,
            },
        });

        return res.status(200).json({
            data,
            message: "Datos obtenidos correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.update = async(req, res) => {
    const id = req.params.id;
    const { idEstado, razonRechazo, obsDistribuidor } = req.body;
    try {
        let data = await gestiondiaria.update({
            idEstado,
            razonRechazo,
            obsDistribuidor,
        }, {
            where: {
                id,
            },
        });
        return res.status(200).json({
            data,
            message: "Datos Guardados correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getProceso = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;
    var f = new Date();
    const mes = f.getMonth() + 1;
    const mesActual = mes < 10 ? `0${mes}` : mes;
    var date = f.getFullYear() + "-" + mesActual;

    try {
        if (profile == 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    idEstado: 1,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    asesordistribuidor,
                    idEstado: 1,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile != 4 && profile != 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    idEstado: 1,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getDespachados = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;
    var f = new Date();
    const mes = f.getMonth() + 1;
    const mesActual = mes < 10 ? `0${mes}` : mes;
    var date = f.getFullYear() + "-" + mesActual;

    try {
        if (profile == 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    idEstado: 2,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    asesordistribuidor,
                    idEstado: 2,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile != 4 && profile != 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    idEstado: 2,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getNoDespachados = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;
    var f = new Date();
    const mes = f.getMonth() + 1;
    const mesActual = mes < 10 ? `0${mes}` : mes;
    var date = f.getFullYear() + "-" + mesActual;

    try {
        if (profile == 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    idEstado: 3,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    distribuidor,
                    asesordistribuidor,
                    idEstado: 3,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            result.forEach(element => {
                const { id, idGestion, code, referencia, valor, cantidad } = element;
                const total = valor.toLocaleString("es-ES");
                data.push({
                    id,
                    idGestion,
                    code,
                    referencia,
                    valor: "$" + total,
                    cantidad
                })
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile != 4 && profile != 5) {
            let data = await gestiondiaria.findAll({
                attributes: [
                    'id',
                    'nit',
                    'savedBy',
                    'asesordistribuidor',
                    'distribuidor',
                    'valorPedido', [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH']
                ],
                include: [{
                        model: estados,
                        as: "estados",
                        attributes: ["name"],
                        required: false,
                    },
                    {
                        model: fichacliente,
                        as: "fichacliente",
                        attributes: ["nombreNegocio"],
                        required: false,
                    },
                ],
                where: {
                    idEstado: 3,
                    ingresoFH: {
                        [Op.substring]: date,
                    }
                },
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getDetalleOrden = async(req, res) => {
    const id = req.params.id;
    const data = [];
    try {
        let result = await detalleorden.findAll({
            where: {
                idGestion: id,
            },
        });

        result.forEach(element => {
            const { id, idGestion, code, referencia, valor, cantidad } = element;
            const total = valor.toLocaleString("es-ES");
            data.push({
                id,
                idGestion,
                code,
                referencia,
                valor: "$" + total,
                cantidad
            })
        });

        return res.status(200).json({
            data,
            message: "Detalles obtenidos correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getPdf = async(req, res) => {
    const id = req.params.id;
    let data = [];
    try {
        let result = await gestiondiaria.findOne({
            attributes: [
                "valorPedido",
                "nit",
                "savedBy", [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%Y-%m-%d %H:%i'), 'ingresoFH'],
                "distribuidor",
                "asesordistribuidor",
            ],
            include: [{
                    model: estados,
                    as: "estados",
                    attributes: ["name"],
                    required: false,
                },
                {
                    model: fichacliente,
                    as: "fichacliente",
                    attributes: ["nombreNegocio"],
                    required: false,
                }
            ],
            where: {
                id,
            },
        });

        const { valorPedido, nit, savedBy, ingresoFH, distribuidor, asesordistribuidor } = result
        const total = valorPedido.toLocaleString("es-ES");
        data.push({
            valorPedido: "$" + total,
            nit,
            savedBy,
            ingresoFH,
            distribuidor,
            asesordistribuidor,
            estado: result.estados.name,
            nombreNegocio: result.fichacliente.nombreNegocio
        })

        return res.status(200).json({
            data,
            message: "Datos obtenidos correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getAgente = async(req, res) => {
    const distribuidor = req.distribuidor;
    const profile = req.profile;
    try {
        if (profile == 5) {
            let data = await appusers.findAll({
                attributes: ["asesor", "email"],
                where: {
                    distribuidor,
                },
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

pedidosController.getActualizarAgente = async(req, res) => {
    const id = req.params.id;
    const distribuidor = req.distribuidor;
    const profile = req.profile;
    const { asesordistribuidor } = req.body;
    try {
        if (profile == 5) {
            let data = await gestiondiaria.update({
                asesordistribuidor
            }, {
                where: {
                    id,
                    distribuidor,
                },
            });
            return res.status(200).json({
                data,
                message: "Asesor Actualizado correctamente"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = pedidosController;