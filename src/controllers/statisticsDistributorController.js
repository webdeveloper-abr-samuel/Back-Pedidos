const gestiondiaria = require("../models").gestiondiaria;
const detalleorden = require("../models").detalleorden;
const db = require("../models");
const { Op } = require("sequelize");
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

statisticsDistributorController.getChartLineal = async (req, res) => {
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
        order: [["ingresoFH", "ASC"]],
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
          ingresoFH: {
            [Op.substring]: fecha,
          },
        },
        order: [["ingresoFH", "ASC"]],
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

statisticsDistributorController.getChartPie = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const queryDistributor = PieDistributor(distribuidor);
  const queryAsesor = PieAsesor(distribuidor,asesordistribuidor);
  const profile = req.profile;

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

};

module.exports = statisticsDistributorController;
