const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authentication");
const pedidosController = require("../../controllers").pedidosController;

router.get("/:id", verifyToken, pedidosController.getById);
router.put("/:id", verifyToken, pedidosController.update);

//ESTADO DE PEDIDOS
router.get("/", verifyToken, pedidosController.get);
router.get("/en/proceso", verifyToken, pedidosController.getProceso);
router.get("/en/despacho", verifyToken, pedidosController.getDespachados);
router.get("/cancelado/despacho", verifyToken, pedidosController.getNoDespachados);

//DETALLES DEL PEDIDO
router.get("/detalle/orden/:id", verifyToken, pedidosController.getDetalleOrden);

//DATOS PARA EL PDF DE CADA PEDIDO
router.get("/pdf/:id", verifyToken, pedidosController.getPdf);

//Agentes
router.get("/asesor/distri", verifyToken, pedidosController.getAgente);
router.put("/asesor/distri/:id", verifyToken, pedidosController.getActualizarAgente);


module.exports = router;
