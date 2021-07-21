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



/* _____________________________________PRUEBAS SHOPPING_____________________________________ */

router.post("/shoping/states", pedidosController.postStates);
router.post("/shoping/product", pedidosController.getShoping);
router.post("/shoping/details", pedidosController.postDetails);
router.post("/shoping/distributor", pedidosController.postDistributor);
router.post("/shoping/states/filter", pedidosController.postStatesFilter);

/* ________________________________PRUEBAS FORMULARIO PREGUNTAS________________________________*/

router.get("/formulario/states", pedidosController.getStates);

/* __________________________________PRUEBAS FORMULARIO ________________________________ */
router.post("/states/date", pedidosController.postStatesDate);

/* _____________________________________VALIDACION ADMIN   _____________________________________ */

router.post("/visits/date", pedidosController.postRangeDate);
router.get("/filter/asesor", pedidosController.getAsesores);
router.get("/filter/clientes", pedidosController.getClientes);
router.post("/data/idAsesor", pedidosController.postIdAsesores);
router.put("/update/comments", pedidosController.putComments);


module.exports = router;