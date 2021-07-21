const gestiondiaria = require("../models").gestiondiaria;
const detalleorden = require("../models").detalleorden;
const fichacliente = require("../models").fichacliente;
const appusers = require("../models").appusers;
const estados = require("../models").estados;
const Sequelize = require("sequelize");
const { Descryp, crypt } = require("../helpers/hashData");
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

pedidosController.get = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  try {
    if (profile == 5) {
      let data = [];
      let result = await gestiondiaria.findAll({
        attributes: [
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
        } = element;

        data.push({
          id,
          nit: Descryp(nit),
          savedBy: Descryp(savedBy),
          asesordistribuidor,
          distribuidor,
          valorPedido: Descryp(valorPedido).toLocaleString('en'),
          ingresoFH,
          estados: estados.name,
          fichacliente: fichacliente.nombreNegocio,
        });
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
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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

pedidosController.getById = async (req, res) => {
  const id = req.params.id;
  let data = [];
  try {
    let result = await gestiondiaria.findOne({
      attributes: ["razonRechazo", "obsDistribuidor","obsVenta"],
      where: {
        id,
      },
    });

    const { razonRechazo, obsDistribuidor, obsVenta } = result;
    data.push({
      razonRechazo: Descryp(razonRechazo),
      obsDistribuidor: Descryp(obsDistribuidor),
      obsVenta: Descryp(obsVenta)
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

pedidosController.update = async (req, res) => {
  const id = req.params.id;
  const { idEstado, razonRechazo, obsDistribuidor } = req.body;
  try {
    let data = await gestiondiaria.update(
      {
        idEstado,
        razonRechazo: crypt(razonRechazo),
        obsDistribuidor: crypt(obsDistribuidor),
      },
      {
        where: {
          id,
        },
      }
    );
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

pedidosController.getProceso = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  try {
    if (profile == 5) {
      let data = [];
      let result = await gestiondiaria.findAll({
        attributes: [
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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

pedidosController.getDespachados = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  try {
    if (profile == 5) {
      let data = [];
      let result = await gestiondiaria.findAll({
        attributes: [
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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

pedidosController.getNoDespachados = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;
  const { fecha } = req.body;
  try {
    if (profile == 5) {
      let data = [];
      let result = await gestiondiaria.findAll({
        attributes: [
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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
          "id",
          "nit",
          "savedBy",
          "asesordistribuidor",
          "distribuidor",
          "valorPedido",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("ingresoFH"),
              "%Y-%m-%d %H:%i"
            ),
            "ingresoFH",
          ],
        ],
        include: [
          {
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
          },
        },
      });

      result.forEach((element) => {
        const {
          id,
          nit,
          savedBy,
          asesordistribuidor,
          distribuidor,
          valorPedido,
          ingresoFH,
          estados,
          fichacliente,
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
          fichacliente: fichacliente.nombreNegocio,
        });
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

pedidosController.getDetalleOrden = async (req, res) => {
  const id = req.params.id;
  const data = [];
  try {
    let result = await detalleorden.findAll({
      where: {
        idGestion: id,
      },
    });

    result.forEach((element) => {
      const { id, idGestion, code, referencia, valor, cantidad } = element;
      const total = valor.toLocaleString("es-ES");
      data.push({
        id,
        idGestion,
        code,
        referencia,
        valor: "$" + total,
        cantidad,
      });
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

pedidosController.getPdf = async (req, res) => {
  const id = req.params.id;
  let data = [];
  try {
    let result = await gestiondiaria.findOne({
      attributes: [
        "valorPedido",
        "nit",
        "savedBy",
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("ingresoFH"),
            "%Y-%m-%d %H:%i"
          ),
          "ingresoFH",
        ],
        "distribuidor",
        "asesordistribuidor",
      ],
      include: [
        {
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
        id,
      },
    });

    const {
      valorPedido,
      nit,
      savedBy,
      ingresoFH,
      distribuidor,
      asesordistribuidor,
    } = result;
    const total = Descryp(valorPedido).toLocaleString("es-ES");
    data.push({
      valorPedido: "$" + total,
      nit: Descryp(nit),
      savedBy: Descryp(savedBy),
      ingresoFH,
      distribuidor,
      asesordistribuidor,
      estado: result.estados.name,
      nombreNegocio: result.fichacliente.nombreNegocio,
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

pedidosController.getAgente = async (req, res) => {
  console.log(req);
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
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

pedidosController.getActualizarAgente = async (req, res) => {
  const id = req.params.id;
  const distribuidor = req.distribuidor;
  const profile = req.profile;
  const { asesordistribuidor } = req.body;
  try {
    if (profile == 5) {
      let data = await gestiondiaria.update(
        {
          asesordistribuidor,
        },
        {
          where: {
            id,
            distribuidor,
          },
        }
      );
      return res.status(200).json({
        data,
        message: "Asesor Actualizado correctamente",
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
  const queryNotificacionAdmin = Notifications(distribuidor, date);
  try {
    let result = await db.sequelize.query(queryNotificacionAdmin);
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

/* _____________________________________PRUEBAS SHOPPING_____________________________________ */
function Details(producto, fecha, departamento, ciudad, barrio) {
  return `SELECT producto,resultado,fecha 
          FROM shopping 
          WHERE shopping.producto = "${producto}" 
          AND shopping.fecha LIKE "%${fecha}%" 
          AND shopping.departamento LIKE "%${departamento}%"
          AND shopping.ciudad LIKE "%${ciudad}%"
          AND shopping.barrio LIKE "%${barrio}%"`;
}

function Filter(clasificacion,distribuidor) {
  return `Select * From shopping WHERE shopping.clasificacion LIKE "%${clasificacion}%" 
  AND shopping.distribuidor LIKE "%${distribuidor}%"`;
}

function FilterDistributor(producto,fecha,departamento, ciudad, barrio) {
  return `SELECT resultado, fecha, distribuidor 
          FROM shopping 
          WHERE shopping.producto = "${producto}" 
          AND shopping.fecha LIKE "%${fecha}%" 
          AND shopping.departamento LIKE "%${departamento}%"
          AND shopping.ciudad LIKE "%${ciudad}%"
          AND shopping.barrio LIKE "%${barrio}%"`
}

function statesFilter(state,producto) {
  return `SELECT  shopping.ciudad, shopping.barrio 
          FROM shopping 
          WHERE shopping.departamento = '${state}' 
          AND shopping.producto= '${producto}'`
}

pedidosController.getShoping = async (req, res) => {
  
  const { clasificacion,distribuidor } = req.body;

  const query = Filter(clasificacion,distribuidor);
  try {
    let result = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
    
    let data = [];
    result.forEach((element) => {
      data.push({
        id: element.id,
        usuario: element.usuario,
        producto: element.producto,
        fecha: element.fecha,
        departamento: element.departamento,
        ciudad: element.ciudad,
        barrio: element.barrio,
        clasificacion: element.clasificacion,
        distribuidor: element.distribuidor,
        resultado: element.resultado,
      });
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

pedidosController.postDetails = async (req, res) => {
  const { producto, fecha, departamento, ciudad, barrio } = req.body;

  /* ----Filtro Fecha----- */
  var f = new Date();
  const mes = f.getMonth() + 1;
  const mesActual = mes < 10 ? `0${mes}` : mes;
  var date = f.getFullYear() + "-" + mesActual;
  const filterDate = fecha == "" ? date : fecha;


  const query = Details(producto, filterDate, departamento, ciudad, barrio);
  try {
    let result = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});

    let structData = [];
    let data = [];
    let marcas = [];
    let datos = [];

    result.forEach((element) => {
      const { producto, resultado, fecha } = element;
      structData.push({
        producto,
        resultado: JSON.parse(resultado),
        fecha
      });
    });

    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);

        return rv;
      }, {});
    };

    values = groupBy(structData, "fecha");

    Object.keys(values).forEach(function (producto) {
      let sum = [];
      let arr = [];
      let min = [];
      let max = [];
      
      values[producto].forEach(function (memb, i) {
        data = groupBy(memb.resultado, "marcas");
        
        Object.keys(data).forEach(function (marca, e) {
          if (typeof sum[marca] === "undefined") {
            min[marca] = 9999999999999999;
            max[marca] = 0;
            sum[marca] = { marca: marca, promedio: 0, contador: 0 };
          }

          if (typeof marcas[marca] === "undefined") {
            marcas[marca] = 1;
          }

          if (data[marca][0].precio < min[marca])
            min[marca] = data[marca][0].precio;
          if (data[marca][0].precio > max[marca])
            max[marca] = data[marca][0].precio;
          if (i == values[producto].length - 1) {
            sum[marca] = {
              max: max[marca],
              min: min[marca],
              marca: marca,
              promedio:
                (sum[marca].promedio + parseInt(data[marca][0].precio)) /
                (sum[marca].contador + 1),
              contador: sum[marca].contador + 1,
            };
          } else {
            sum[marca] = {
              marca: marca,
              promedio: sum[marca].promedio + parseInt(data[marca][0].precio),
              contador: sum[marca].contador + 1,
            };
          }
        });
      });


      Object.keys(sum).forEach(function (c) {
        arr.push({
          marca: c,
          promedio: sum[c].promedio,
          max: sum[c].max,
          min: sum[c].min,
        });
      });

      datos.push({
        fecha: producto,
        resultado: arr,
      });
    });

    for (let i = 0; i < datos.length; i++) {
      let arr = [];
      Object.keys(marcas).forEach(function (c) {
        let exist = false;
        for (let o = 0; o < datos[i].resultado.length; o++) {
          if (datos[i].resultado[o].marca == c) {
            arr.push(datos[i].resultado[o]);
            exist = true;
          }
        }
        if (exist == false) {
          arr.push({ marca: c, promedio: 0 });
        }
      });
      datos[i].resultado = arr;
    }

    return res.status(200).json({
      datos,
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

pedidosController.postStates = async (req, res) => {
  const { producto } = req.body;
  try {
    let dataDepartamento = await db.sequelize.query(
      `SELECT DISTINCT departamento FROM shopping WHERE shopping.producto = "${producto}"`, 
      {type: db.sequelize.QueryTypes.SELECT,}
    );

    const result = new Set(dataDepartamento);
    let data = [...result];
   
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

pedidosController.postStatesFilter = async (req, res) => {
  const { departamento,producto } = req.body;
  const query = statesFilter(departamento,producto);
  try {
    let result = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});

    let Ciudades = [];
    let Barrios = [];
    result.forEach(element => {
      Ciudades.push(element.ciudad);
      Barrios.push(element.barrio);
    });

    const dataCiudades = new Set(Ciudades);
    let resultCiudades = [...dataCiudades];

    const dataBarrios = new Set(Barrios);
    let resultBarrios = [...dataBarrios];
   
    return res.status(200).json({
      resultCiudades,
      resultBarrios,
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

pedidosController.postDistributor = async (req, res) => {
  
  const {  producto, fecha, departamento, ciudad, barrio } = req.body;
  /* ----Filtro Fecha----- */
  var f = new Date();
  const mes = f.getMonth() + 1;
  const mesActual = mes < 10 ? `0${mes}` : mes;
  var date = f.getFullYear() + "-" + mesActual;
  const filterDate = fecha == "" ? date : fecha;

  const query = FilterDistributor(producto, filterDate,departamento, ciudad, barrio);
  try {
    let result = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});

    let structData = [];

    result.forEach((element) => {
      const { resultado, fecha, distribuidor } = element;
      const items = JSON.parse(resultado)
      items.forEach(element => {
        if (element.marcas == "Abracol") {
          structData.push({
            fecha,
            distribuidor,
            precio: element.precio
          });          
        }
      });
    });         
  
    const resultado = [...structData.reduce((r, o) => {
      const key = o.fecha + '-' + o.distribuidor;
      
      const item = r.get(key) || Object.assign({}, o, {
         precio: 0,
         count: 0,
         promedio: 0,
         max: 0,
         min: o.precio
      });
      
      item.count += 1;
      item.precio += o.precio;
      
      if(item.count > 1) {
        item.promedio = item.precio / item.count    
      }
      
      if(item.count == 1){
        item.promedio = o.precio
      }
      
      if(item.max < o.precio){
        item.max = o.precio
      }
      
      if (o.precio < item.min) {
        item.min = o.precio
      }
      
      
      return r.set(key, item);
    }, new Map).values()];
    
    let data = [];
    resultado.forEach(el => {
      data.push({
        fecha: el.fecha,
        distribuidor: el.distribuidor,
        promedio: el.promedio,
        maximo: el.max,
        minimo: el.min
      })
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

/* __________________________________PRUEBAS FORMULARIO PREGUNTAS________________________________ */
pedidosController.getStates = async (req, res) => {
  try {
    let data = await db.sequelize.query(`SELECT name FROM states`, {
      type: db.sequelize.QueryTypes.SELECT,
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


/* __________________________________PRUEBAS FORMULARIO ________________________________ */
function states_date(state, date) {
  return `SELECT * FROM formulario WHERE formulario.departamento LIKE "%${state}%" AND formulario.fecha = "${date}"`
}

pedidosController.postStatesDate = async (req, res) => {
  const { departamento, fecha } = req.body;
  /* ----Filtro Fecha----- */
  var f = new Date();
  const mes = f.getMonth() + 1;
  const mesActual = mes < 10 ? `0${mes}` : mes;
  var date = f.getFullYear() + "-" + mesActual + "-" + f.getDate();;
  const filterDate = fecha == "" ? date : fecha;
  
  const query = states_date(departamento,filterDate);
  try {
    let result = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
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

/* _____________________________________Validacion Admin_____________________________________ */


function rangeDateRoute(idRoute ,idCliente, dateStart , dateEnd) {
  return `SELECT v.*, r.asesor,c.nombre FROM visitas v 	
          JOIN rutas r ON (v.idRuta = r.id)  
          JOIN cliente c ON (v.idCliente = c.id)
          WHERE v.idRuta IN (${idRoute}) 
          AND v.idCliente = ${idCliente} 
          AND v.fechaModificacion BETWEEN '${dateStart} 00:00' AND '${dateEnd} 23:59'`;
}

function asesores() {
  return `SELECT DISTINCT rutas.asesor FROM rutas`;
}

function idAsesores(asesor) {
  return `SELECT rutas.id FROM rutas WHERE rutas.asesor LIKE "%${asesor}%"`
}

function client() {
  return `SELECT cliente.id,cliente.nombre FROM cliente`;
}

function updateComments(id, comments, fecha) {
  return `UPDATE visitas SET visitas.observacionGerente = "${comments}" , visitas.fechaGerente = "${fecha}" 
          WHERE visitas.id IN (${id})`;
}

pedidosController.postRangeDate = async (req, res) => {
  
  const { idRoute,idCliente, dateStart, dateEnd } = req.body;
  const query = rangeDateRoute(idRoute,idCliente, dateStart, dateEnd);

  try {
    let data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
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

pedidosController.getAsesores = async (req, res) => {
  
  const query = asesores();

  try {
    let data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
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

pedidosController.postIdAsesores = async (req, res) => {
  const { asesor } = req.body;
  const query = idAsesores(asesor);

  try {
    let data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
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

pedidosController.getClientes = async (req, res) => {
  
  const query = client();

  try {
    let data = await db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT,});
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

pedidosController.putComments = async (req, res) => {
  const { id,comments } = req.body;

  /* ----Filtro Fecha----- */
  let hoy = new Date();
  let fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
  let hora = hoy.getHours() + ':' + hoy.getMinutes() + '-' + hoy.getSeconds();
  let fechaYHora = fecha + ' ' + hora;

  const query = updateComments(id,comments,fechaYHora);

  try {
    await db.sequelize.query(query);
    return res.status(200).json({
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = pedidosController;
