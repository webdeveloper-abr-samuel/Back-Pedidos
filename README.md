#Posibles-Causas

Cartera con el distribuidor
Monto insuficiente
No hay producto en inventario del distribuidor
No hay producto en inventario de Abracol
Zona de no cobertura
Cliente desiste del pedido
Factura inválida
Demora en la entrega


#MODELS

//APPUSERS
sequelize model:generate --name appusers --attributes email:string,password:string,profile:boolean

//FICHA CLIENTE
sequelize model:generate --name fichacliente --attributes nombreNegocio:string,estrato:string,nit:string,telefono:string,contacto:string,cargo:string,correo:string,pais:string,departamento:string,ciudadPoblacion:string,territorio:string,nroComunazona:string,nombreComZon:string,barrio:string,clasificacion:string,tipologia:string,ordenRuta:string,comentarios:string,direccion:string,creadoPor:string,creacionFH:dateonly,modificadoPor:string,modificacionFH:dateonly,pubExte:string,pubInte:string,exhibi:string,lat:string,lng:string,gooSitioId:string,foto:string,origenDatos:string,prodAbrasivos:string,lineasS:string,promCompr:string,UnCorteF:string,marcas:string,unFlapD:string,marcasFD:string,promLS:string,maLijS:string,numVerParPer:string,canal:string

//GESTION DIARIA
sequelize model:generate --name gestiondiaria --attributes idCliente:integer,venta:string,noVenta:string,valorPedido:integer,obsVenta:string,nit:string,Latitude:string,Longitude:string,savedBy:string,ingresoFH:dateonly,imgRuta:string,taskID:integer,form:string,vendedor:string,distribuidor:string,prodAbrVen:text

//ESTADOS
sequelize model:generate --name estados --attributes name:string

//DETALLE ORDEN
sequelize model:generate --name detalleorden --attributes code:string,referencia:string,valor:integer,cantidad:integer


-----------------------------------------------------------------------------------------------------------------

#RELATIONS

//FICHA CLIENTE - GESTION DIARIA
sequelize migration:generate --name fichacliente-gestiondiaria

//GESTION DIARIA - DETALLE ORDEN
sequelize migration:generate --name gestiondiaria-detalleorden


-----------------------------------------------------------------------------------------------------------------

#SEED-ESTADOS
npx sequelize-cli seed:generate --name estados
