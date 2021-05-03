const gestiondiaria = require("../models").gestiondiaria;
const detalleorden = require("../models").detalleorden;
const fichacliente = require("../models").fichacliente;
const appusers = require("../models").appusers;
const estados = require("../models").estados;
const Sequelize = require("sequelize");
const { Descryp, crypt } = require('../helpers/hashData');
const Op = Sequelize.Op;
const db = require("../models");
pedidosController = {};


function Notifications(distribuidor, fecha) {
  return `SELECT detalleordens.idGestion, detalleordens.idGestion as id  FROM detalleordens, gestiondiaria 
  WHERE gestiondiaria.id = detalleordens.idGestion 
  AND gestiondiaria.distribuidor = '${distribuidor}'
  AND gestiondiaria.ingresoFH LIKE "%${fecha}%"
  GROUP BY detalleordens.idGestion 
  ORDER BY gestiondiaria.id DESC 
  LIMIT 0,5`;
}

pedidosController.get = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;
    const { fecha } = req.body;
    try {
        if (profile == 5) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
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
    let data = [];
    try {
        let result = await gestiondiaria.findOne({
            attributes: ["razonRechazo", "obsDistribuidor"],
            where: {
                id,
            },
        });

        const { razonRechazo, obsDistribuidor} = result;
        data.push({
            razonRechazo: Descryp(razonRechazo), 
            obsDistribuidor: Descryp(obsDistribuidor), 
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

pedidosController.update = async(req, res) => {
    const id = req.params.id;
    const { idEstado, razonRechazo, obsDistribuidor } = req.body;
    try {
        let data = await gestiondiaria.update({
            idEstado,
            razonRechazo: crypt(razonRechazo),
            obsDistribuidor: crypt(obsDistribuidor)
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
    const { fecha } = req.body;
    try {
        if (profile == 5) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
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
    const { fecha } = req.body;
    try {
        if (profile == 5) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
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
    const { fecha } = req.body;
    try {
        if (profile == 5) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
            });

            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = [];
            let result = await gestiondiaria.findAll({
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
                        [Op.substring]: fecha,
                    }
                },
            });

            result.forEach(element => {
                const { 
                    id, 
                    nit, 
                    savedBy, 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido, 
                    ingresoFH, 
                    estados,
                    fichacliente 
                } = element;

                data.push({
                    id, 
                    nit: Descryp(nit), 
                    savedBy: Descryp(savedBy), 
                    asesordistribuidor, 
                    distribuidor, 
                    valorPedido: Descryp(valorPedido), 
                    ingresoFH, 
                    estados: estados.name,
                    fichacliente: fichacliente.nombreNegocio
                })
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
        const total = Descryp(valorPedido).toLocaleString("es-ES");
        data.push({
            valorPedido: "$" + total,
            nit: Descryp(nit), 
            savedBy : Descryp(savedBy),
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
    console.log(req)
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
        console.log(error)
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

pedidosController.getNotification = async (req, res) => {
  const distribuidor = req.distribuidor;
  var f = new Date();
  const mes = f.getMonth() + 1;
  const mesActual = mes < 10 ? `0${mes}` : mes;
  var date = f.getFullYear() + "-" + mesActual;
  const queryNotificacionAdmin = Notifications(distribuidor,date);
  try {
    let result = await db.sequelize.query(queryNotificacionAdmin);
    return res.status(200).json({
      data : result[0],
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = pedidosController;
