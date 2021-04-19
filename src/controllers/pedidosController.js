const gestiondiaria = require("../models").gestiondiaria;
const detalleorden = require("../models").detalleorden;
const fichacliente = require("../models").fichacliente;
const estados = require("../models").estados;
pedidosController = {};

pedidosController.get = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;

  try {
    if (profile == 5) {
      let data = await gestiondiaria.findAll({
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
        },
      });
      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let data = await gestiondiaria.findAll({
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

pedidosController.getById = async (req, res) => {
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

pedidosController.update = async (req, res) => {
  const id = req.params.id;
  const { idEstado, razonRechazo, obsDistribuidor } = req.body;
  try {
    let data = await gestiondiaria.update(
      {
        idEstado,
        razonRechazo,
        obsDistribuidor,
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

  try {
    if (profile == 5) {
      let data = await gestiondiaria.findAll({
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
        },
      });
      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let data = await gestiondiaria.findAll({
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

pedidosController.getDespachados = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;

  try {
    if (profile == 5) {
      let data = await gestiondiaria.findAll({
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
        },
      });
      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let data = await gestiondiaria.findAll({
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

pedidosController.getNoDespachados = async (req, res) => {
  const distribuidor = req.distribuidor;
  const asesordistribuidor = req.asesor;
  const profile = req.profile;

  try {
    if (profile == 5) {
      let data = await gestiondiaria.findAll({
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
        },
      });
      return res.status(200).json({
        data,
        message: "Datos obtenidos correctamente",
      });
    }

    if (profile == 4) {
      let data = await gestiondiaria.findAll({
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

pedidosController.getDetalleOrden = async (req, res) => {
  const id = req.params.id;
  try {
    let data = await detalleorden.findAll({
      where: {
        idGestion: id,
      },
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
        "ingresoFH",
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
        }
      ],
      where: {
        id,
      },
    });

    const { valorPedido,nit,savedBy,ingresoFH,distribuidor,asesordistribuidor } = result
    data.push({
      valorPedido,
      nit,
      savedBy,
      ingresoFH,
      distribuidor,
      asesordistribuidor,
      estado: result.estados.name,
      nombreNegocio:result.fichacliente.nombreNegocio
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
module.exports = pedidosController;
