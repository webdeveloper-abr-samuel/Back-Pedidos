const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authentication");
const pedidosController = require("../../controllers").pedidosController;

router.get("/:id", verifyToken, pedidosController.getById);
router.put("/:id", verifyToken, pedidosController.update);

//ESTADO DE PEDIDOS
router.post("/", verifyToken, pedidosController.get);
router.post("/en/proceso", verifyToken, pedidosController.getProceso);
router.post("/en/despacho", verifyToken, pedidosController.getDespachados);
router.post("/cancelado/despacho", verifyToken, pedidosController.getNoDespachados);

//DETALLES DEL PEDIDO
router.get("/detalle/orden/:id", verifyToken, pedidosController.getDetalleOrden);

//DATOS PARA EL PDF DE CADA PEDIDO
router.get("/pdf/:id", verifyToken, pedidosController.getPdf);

//Agentes
router.get("/asesor/distri", verifyToken, pedidosController.getAgente);
router.put("/asesor/distri/:id", verifyToken, pedidosController.getActualizarAgente);

//Notifications
router.get("/distri/notifications", verifyToken, pedidosController.getNotification);

module.exports = router;