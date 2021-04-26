const gestiondiaria = require("../models").gestiondiaria;
const db = require("../models");
const { Op, Sequelize } = require("sequelize");
statisticsDistributorController = {};

function PieDistributor(distribuidor) {
    return `SELECT 	(SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 1 ) as Proceso,
                  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 2 ) as Despachado,
                  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 3 ) as NoDespachado
          FROM 	gestiondiaria
          WHERE 	gestiondiaria.distribuidor = "${distribuidor}"
          GROUP BY gestiondiaria.distribuidor`;
}

function PieAsesor(distribuidor, asesor) {
    return `SELECT 	
  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 1 AND gestiondiaria.distribuidor = "${distribuidor}" AND gestiondiaria.asesordistribuidor = "${asesor}" ) as Proceso,
  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 2 AND gestiondiaria.distribuidor = "${distribuidor}" AND gestiondiaria.asesordistribuidor = "${asesor}" ) as Despachado,
  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 3 AND gestiondiaria.distribuidor = "${distribuidor}" AND gestiondiaria.asesordistribuidor = "${asesor}" ) as NoDespachado`
}

<<<<<<< HEAD
statisticsDistributorController.getChartLineal = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const profile = req.profile;
    const { fecha } = req.body;
    try {
        if (profile == 5) {
            let data = await gestiondiaria.findAll({
                attributes: ["id", "valorPedido", "ingresoFH"],
                where: {
                    distribuidor,
                    ingresoFH: {
                        [Op.substring]: fecha,
                    },
                },
                order: [
                    ["ingresoFH", "ASC"]
                ],
            });
            return res.status(200).json({
                data,
                message: "Datos obtenidos correctamente",
            });
        }

        if (profile == 4) {
            let data = await gestiondiaria.findAll({
                attributes: ["id", "valorPedido", "ingresoFH"],
                where: {
                    distribuidor,
                    asesordistribuidor,
                    asesordistribuidor,
                    ingresoFH: {
                        [Op.substring]: fecha,
                    },
                },
                order: [
                    ["ingresoFH", "ASC"]
                ],
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

statisticsDistributorController.getChartPie = async(req, res) => {
    const distribuidor = req.distribuidor;
    const asesordistribuidor = req.asesor;
    const queryDistributor = PieDistributor(distribuidor);
    const queryAsesor = PieAsesor(distribuidor, asesordistribuidor);
    const profile = req.profile;
=======
function PieAsesorAbracol() {
  return `SELECT 	(SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 1 ) as Proceso,
                  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 2 ) as Despachado,
                  (SELECT COUNT(*) FROM gestiondiaria  WHERE gestiondiaria.idEstado = 3 ) as NoDespachado
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion
          GROUP BY gestiondiaria.idCliente`;
}

function ChartLinealAbracol(fecha) {
  return `SELECT gestiondiaria.valorPedido, gestiondiaria.ingresoFH ,DAY(gestiondiaria.ingresoFH) as dia
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion AND gestiondiaria.ingresoFH LIKE "%${fecha}%"
          GROUP BY detalleordens.idGestion`
}

function StatesClient(distribuidor) {
  return `select count(*) as cantidad, departamento 
          from gestiondiaria 
          inner join fichacliente ON gestiondiaria.idCliente = fichacliente.id 
          where distribuidor like '${distribuidor}' group by departamento`
}

statisticsDistributorController.getChartLineal = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  const query = ChartLinealAbracol(fecha);
  try {
    if (profile == 5) {
      let result = await gestiondiaria.findAll({
        attributes: [
          "id", 
          "valorPedido",
          [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%m'), 'mes'],
          [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%d'), 'dia']
        ],
        where: {
          distribuidor,
          ingresoFH: {
            [Op.substring]: fecha,
          },
        },
        order: [["ingresoFH", "ASC"]],
      });

      var data = [];
      result.reduce(function(res, value) {
        console.log(value.dataValues.dia);
        if (!res[value.dataValues.dia]) {
          res[value.dataValues.dia] = { ingresoFH: value.dataValues.dia, valorPedido: 0 };
          data.push(res[value.dataValues.dia])
        }
        res[value.dataValues.dia].valorPedido += value.dataValues.valorPedido;
        return res;
      }, {});

      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let result = await gestiondiaria.findAll({
        attributes: [
          "id", 
          "valorPedido",
          [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%m'), 'mes'],
          [Sequelize.fn('date_format', Sequelize.col('ingresoFH'), '%d'), 'dia']
        ],
        where: {
          distribuidor,
          asesordistribuidor,
          ingresoFH: {
            [Op.substring]: fecha,
          },
        },
        order: [["ingresoFH", "ASC"]],
      });

      var data = [];
      result.reduce(function(res, value) {
        console.log(value.dataValues.dia);
        if (!res[value.dataValues.dia]) {
          res[value.dataValues.dia] = { ingresoFH: value.dataValues.dia, valorPedido: 0 };
          data.push(res[value.dataValues.dia])
        }
        res[value.dataValues.dia].valorPedido += value.dataValues.valorPedido;
        return res;
      }, {});

      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }       

    if (profile != 4 && profile != 5) {
      let result = await db.sequelize.query(query);

      var data = [];
      result[0].reduce(function(res, value) {
        if (!res[value.dia]) {
          res[value.dia] = { ingresoFH: value.dia, valorPedido: 0 };
          data.push(res[value.dia])
        }
        res[value.dia].valorPedido += value.valorPedido;
        return res;
      }, {});

      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente"
      });
    }    
    
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

statisticsDistributorController.getChartPie = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const queryDistributor = PieDistributor(distribuidor);
  const queryAsesor = PieAsesor(distribuidor,asesordistribuidor);
  const queryAsesorAbracol = PieAsesorAbracol();

  const profile = req.profile;
>>>>>>> 11fc9ac46f007dbaae56aabc7e739a513e5d3545

    if (profile == 5) {
        try {
            let result = await db.sequelize.query(queryDistributor);
            return res.status(200).json({
                data: result[0],
                message: "Datos obtenidos correctamente",
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
    }

    if (profile == 4) {
        try {
            let result = await db.sequelize.query(queryAsesor);
            return res.status(200).json({
                data: result[0],
                message: "Datos obtenidos correctamente",
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
            });
        }
    }

  if (profile != 5 && profile != 4) {
    try {
      let result = await db.sequelize.query(queryAsesorAbracol);
      return res.status(200).json({
        data: result[0],
        message: "Datos obtenidos correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

};

statisticsDistributorController.getChartStates = async (req, res) => {
  const distribuidor = req.distribuidor;
  const query = StatesClient(distribuidor);
  try {
    let result = await db.sequelize.query(query);
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

module.exports = statisticsDistributorController;