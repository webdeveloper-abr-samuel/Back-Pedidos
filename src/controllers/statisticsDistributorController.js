const db = require("../models");
statisticsDistributorController = {};

function PieDistributor(distribuidor, fecha) {
  return `SELECT 
          count(Case idEstado when 1 then id end) as Proceso,
          count(Case idEstado when 2 then id end) as Despachado,
          count(Case idEstado when 3 then id end) as NoDespachado
          FROM 	gestiondiaria
          WHERE 	gestiondiaria.distribuidor = "${distribuidor}" AND gestiondiaria.ingresoFH LIKE '%${fecha}%'
          GROUP BY gestiondiaria.distribuidor`;
}

function PieAsesor(distribuidor, asesor, fecha) {
  return `SELECT count(Case idEstado when 1 then id end) as Proceso,
          count(Case idEstado when 2 then id end) as Despachado,
          count(Case idEstado when 3 then id end) as NoDespachado
          FROM 	gestiondiaria
          WHERE gestiondiaria.distribuidor = "${distribuidor}" 
          AND gestiondiaria.asesordistribuidor = "${asesor}" 
          AND gestiondiaria.ingresoFH LIKE '%${fecha}%'
          GROUP BY gestiondiaria.distribuidor`;
}

function PieAsesorAbracol() {
  return `SELECT 	count(Case idEstado when 1 then id end) as Proceso,
          count(Case idEstado when 2 then id end) as Despachado,
          count(Case idEstado when 3 then id end) as NoDespachado
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion
          GROUP BY gestiondiaria.idCliente`;
}

function ChartLinealAbracol(fecha) {
  return `SELECT SUM(detalleordens.valor*detalleordens.cantidad) as valorPedido, 
          gestiondiaria.ingresoFH ,DAY(gestiondiaria.ingresoFH) as dia
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion AND gestiondiaria.ingresoFH LIKE "%${fecha}%"
          GROUP BY detalleordens.idGestion`;
}

function ChartLinealDistributor(fecha, distribuidor) {
  return `SELECT SUM(detalleordens.valor*detalleordens.cantidad) as valorPedido, 
          gestiondiaria.ingresoFH ,DAY(gestiondiaria.ingresoFH) as dia
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion 
          AND gestiondiaria.distribuidor = "${distribuidor}"
          AND gestiondiaria.ingresoFH LIKE "%${fecha}%"
          GROUP BY detalleordens.idGestion`;
}

function ChartLinealAsesor(fecha, distribuidor, asesordistribuidor) {
  return `SELECT SUM(detalleordens.valor*detalleordens.cantidad) as valorPedido, 
          gestiondiaria.ingresoFH ,DAY(gestiondiaria.ingresoFH) as dia
          FROM gestiondiaria, detalleordens
          WHERE gestiondiaria.id = detalleordens.idGestion 
          AND gestiondiaria.distribuidor = "${distribuidor}"
          AND gestiondiaria.asesordistribuidor = "${asesordistribuidor}"
          AND gestiondiaria.ingresoFH LIKE "%${fecha}%"
          GROUP BY detalleordens.idGestion`;
}

function StatesClient(distribuidor) {
  return `select count(*) as cantidad, departamento 
          from gestiondiaria 
          inner join fichacliente ON gestiondiaria.idCliente = fichacliente.id 
          where distribuidor like '${distribuidor}' group by departamento`;
}

statisticsDistributorController.getChartLineal = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  const queryChartLinealAbracol = ChartLinealAbracol(fecha);
  const queryChartLinealDistributor = ChartLinealDistributor(fecha, distribuidor);
  const queryChartLinealAsesor = ChartLinealAsesor(fecha, distribuidor, asesordistribuidor);
  try {
    if (profile == 5) {
      let result = await db.sequelize.query(queryChartLinealDistributor);

      var data = [];
      result[0].reduce(function (res, value) {
        if (!res[value.dia]) {
          res[value.dia] = {
            ingresoFH: value.dia,
            valorPedido: 0,
          };
          data.push(res[value.dia]);
        }
        res[value.dia].valorPedido += parseInt(value.valorPedido);
        return res;
      }, {});

      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let result = await db.sequelize.query(queryChartLinealAsesor);
      var data = [];
      result[0].reduce(function (res, value) {
        if (!res[value.dia]) {
          res[value.dia] = {
            ingresoFH: value.dia,
            valorPedido: 0,
          };
          data.push(res[value.dia]);
        }
        res[value.dia].valorPedido += parseInt(value.valorPedido);
        return res;
      }, {});

      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile != 4 && profile != 5) {
      let result = await db.sequelize.query(queryChartLinealAbracol);

      var data = [];
      result[0].reduce(function (res, value) {
        if (!res[value.dia]) {
          res[value.dia] = { ingresoFH: value.dia, valorPedido: 0 };
          data.push(res[value.dia]);
        }
        res[value.dia].valorPedido += parseInt(value.valorPedido);
        return res;
      }, {});

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
  const { fecha } = req.body;
  const queryDistributor = PieDistributor(distribuidor,fecha);
  const queryAsesor = PieAsesor(distribuidor, asesordistribuidor,fecha);
  const queryAsesorAbracol = PieAsesorAbracol();

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
      data: result[0],
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = statisticsDistributorController;
