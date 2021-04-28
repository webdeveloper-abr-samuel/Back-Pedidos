(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-148700e8"],{"1c79":function(t,e,a){},6624:function(t,e,a){"use strict";var o=a("1c79"),n=a.n(o);n.a},dda4:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("div",{staticClass:"row"},[a("PedidosTable")],1)])},n=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("va-card",{attrs:{title:t.$t("Pedidos")}},[a("div",{staticClass:"row align--center"},[a("div",{staticClass:"flex xs12 md6"},[a("va-input",{attrs:{value:t.term,placeholder:t.$t("Busqueda Por Estado"),removable:""},on:{input:t.search}},[a("va-icon",{attrs:{slot:"prepend",name:"entypo entypo-search"},slot:"prepend"})],1)],1),a("div",{staticClass:"flex xs12 md3 offset--md3"},[a("va-select",{attrs:{label:t.$t("Por Pagina"),options:t.perPageOptions,noClear:""},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)]),a("va-data-table",{staticClass:"text-center",attrs:{fields:t.fields,data:t.filteredData,"per-page":parseInt(t.perPage),clickable:""},scopedSlots:t._u([{key:"trend",fn:function(e){return[a("va-icon",{attrs:{name:t.getTrendIcon(e.rowData),color:t.getTrendColor(e.rowData)}})]}},{key:"estados.name",fn:function(e){return["Proceso"==e.rowData.estados.name?a("div",[a("va-badge",{attrs:{color:"blue"}},[t._v(" "+t._s(e.rowData.estados.name)+" ")])],1):t._e(),"Despachado"==e.rowData.estados.name?a("div",[a("va-badge",{attrs:{color:"green"}},[t._v(" "+t._s(e.rowData.estados.name)+" ")])],1):t._e(),"NoDespachado"==e.rowData.estados.name?a("div",[a("va-badge",{attrs:{color:"red"}},[t._v(" "+t._s(e.rowData.estados.name)+" ")])],1):t._e()]}},{key:"actions",fn:function(e){return[a("div",{staticClass:"flex xs12 xl6"},[a("va-button-group",[a("va-button",{attrs:{title:"Detalles del pedido",outline:"",small:"",color:"info",icon:"entypo entypo-eye"},on:{click:function(a){return t.ShowDetails(e.rowData.id)}}}),a("va-button",{attrs:{title:"Ver Observaciones",outline:"",small:"",color:"info",icon:"entypo entypo-info"},on:{click:function(a){return t.ShowReasons(e.rowData.id)}}}),5==t.agente&&"Proceso"==e.rowData.estados.name?a("va-button",{attrs:{title:"Actualizar Asesor",outline:"",small:"",color:"info",icon:"entypo entypo-cog"},on:{click:function(a){return t.ShowAgent(e.rowData.id)}}}):t._e(),a("va-button",{attrs:{title:"Descargar Pdf",outline:"",small:"",color:"info",icon:"entypo entypo-docs"},on:{click:function(a){return t.DownloadPdf(e.rowData.id)}}}),"Proceso"==e.rowData.estados.name?a("va-button",{attrs:{title:"Aceptar o Rechazar Pedido",outline:"",small:"",color:"success",icon:"entypo entypo-check"},on:{click:function(a){return t.changeStatus(e.rowData.id)}}}):t._e()],1)],1)]}}])})],1),a("va-modal",{attrs:{title:t.$t("Actualizar Asesor"),"hide-default-actions":!0},model:{value:t.ShowDataAgent,callback:function(e){t.ShowDataAgent=e},expression:"ShowDataAgent"}},[a("div",{staticClass:"row container"},[a("label",{staticClass:"mb-2"},[t._v("Seleccione para actualizar el asesor asignado a esta pedido")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.agentDistri,expression:"agentDistri"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.agentDistri=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"Cartera con el distribuidor"}},[t._v("Seleccionar asesor distribuidor")]),t._l(t.allAgent,(function(e,o){return a("option",{key:o,domProps:{value:e.asesor+"-"+e.email}},[t._v(t._s(e.asesor))])}))],2),a("div",{staticClass:"d-flex justify-content-center btn-group mb-2"},[a("va-button",{attrs:{color:"danger"},on:{click:function(e){t.ShowDataAgent=!1}}},[t._v("Cerrar")]),a("va-button",{attrs:{color:"success"},on:{click:function(e){return t.SavedAgent()}}},[t._v("Guardar")])],1)])]),a("va-modal",{attrs:{title:t.$t("Crear Observacion"),"hide-default-actions":!0},model:{value:t.showChangeStatus,callback:function(e){t.showChangeStatus=e},expression:"showChangeStatus"}},[a("div",{staticClass:"row container"},[a("label",{staticClass:"mb-2"},[t._v("Seleccionar Estado Del Pedido")]),a("div",{staticClass:"form-group mb-3 col-md-12"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.status=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"2"}},[t._v("Despachar")]),a("option",{attrs:{value:"3"}},[t._v("No Despachar")])])]),3==t.status?a("div",{staticClass:"form-group mb-3 col-md-12"},[a("label",{staticClass:"mb-2"},[t._v("Seleccionar Por Que Rechaza El Pedido")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.reasons,expression:"reasons"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.reasons=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"Cartera con el distribuidor"}},[t._v("Cartera con el distribuidor")]),a("option",{attrs:{value:"Monto insuficiente"}},[t._v("Monto insuficiente")]),a("option",{attrs:{value:"No hay producto en inventario del distribuidor"}},[t._v("No hay producto en inventario del distribuidor")]),a("option",{attrs:{value:"No hay producto en inventario de Abracol"}},[t._v("No hay producto en inventario de Abracol")]),a("option",{attrs:{value:"Zona de no cobertura"}},[t._v("Zona de no cobertura")]),a("option",{attrs:{value:"Desistir Pedido"}},[t._v("Desistir Pedido")]),a("option",{attrs:{value:"Factura inválida"}},[t._v("Factura inválida")]),a("option",{attrs:{value:"Demora en la entrega"}},[t._v("Demora en la entrega")])])]):t._e(),a("div",{staticClass:"col-md-12 mb-3 form-group"},[a("label",{staticClass:"mb-2"},[t._v("Agregar Una Observación")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comments,expression:"comments"}],staticClass:"form-control",attrs:{placeholder:"Observaciones",rows:"3"},domProps:{value:t.comments},on:{input:function(e){e.target.composing||(t.comments=e.target.value)}}})]),a("div",{staticClass:"d-flex justify-content-center btn-group mb-2"},[a("va-button",{attrs:{color:"danger"},on:{click:function(e){t.showChangeStatus=!1}}},[t._v("Cerrar")]),a("va-button",{attrs:{color:"success"},on:{click:function(e){return t.SavedStatus()}}},[t._v("Guardar")])],1)])]),a("va-modal",{attrs:{title:t.$t("Detalles de la Orden"),"hide-default-actions":!0},model:{value:t.showDetailsOrder,callback:function(e){t.showDetailsOrder=e},expression:"showDetailsOrder"}},[a("div",{staticStyle:{width:"600px"}},[a("detailsOrderTable",{attrs:{DetallesOrden:t.DetallesOrden}})],1),a("div",{staticClass:"d-flex justify-content-center btn-group mb-3"},[a("va-button",{attrs:{color:"danger"},on:{click:function(e){t.showDetailsOrder=!1}}},[t._v("Cerrar")])],1)]),a("va-modal",{attrs:{title:t.$t("Observaciones"),"hide-default-actions":!0},model:{value:t.showObs,callback:function(e){t.showObs=e},expression:"showObs"}},[a("div",{staticClass:"container"},[a("p",{staticClass:"mb-2 text-center"},[t._v(" "+t._s(t.dataReasons.razonRechazo)+" ")]),a("p",{staticClass:"mb-2 text-justify"},[t._v(" "+t._s(t.dataReasons.obsDistribuidor)+" ")]),a("div",{staticClass:"d-flex justify-content-center btn-group mb-2"},[a("va-button",{attrs:{color:"danger"},on:{click:function(e){t.showObs=!1}}},[t._v("Cerrar")])],1)])])],1)},s=[],i=a("a34a"),c=a.n(i),l=a("2ef0"),d=a("bc3a"),u=a.n(d),A=a("7cc2"),p=a("8baf"),h=(a("0da40"),"./abrageo"),v={name:"pedidosTable",components:{detailsOrderTable:A["a"]},data:function(){return{term:null,perPage:"10",perPageOptions:["2","4","6","10","20"],pedidos:[],dataReasons:[],DetallesOrden:[],showChangeStatus:!1,showObs:!1,showDetailsOrder:!1,status:"",reasons:"",ShowDataAgent:!1,allAgent:[],comments:"",id_pedido:"",agente:"",id_agent:"",agentDistri:""}},computed:{fields:function(){return[{name:"fichacliente.nombreNegocio",title:"Cliente",width:"30px",height:"45px",dataClass:"text-center"},{name:"nit",title:"Nit",width:"30px",height:"45px",dataClass:"text-center"},{name:"savedBy",title:"Asesor",width:"30px",height:"45px",dataClass:"text-center"},{name:"ingresoFH",title:"Fecha Ingreso",width:"30px",height:"45px",dataClass:"text-center"},{name:"distribuidor",title:"Distribuidor",width:"30px",height:"45px",dataClass:"text-center"},{name:"asesordistribuidor",title:"Agente",width:"30px",height:"45px",dataClass:"text-center"},{title:"Estado",name:"__slot:estados.name",width:"30px",height:"45px",dataClass:"text-center"},{name:"valorPedido",title:"Total",width:"30px",height:"45px",dataClass:"text-center"},{name:"__slot:actions",width:"30px",height:"45px",dataClass:"text-center"}]},filteredData:function(){var t=this;return!this.term||this.term.length<1?this.pedidos:this.pedidos.filter((function(e){return e.estados.name.toLowerCase().startsWith(t.term.toLowerCase())}))}},created:function(){this.loadTable();var t=localStorage.getItem("pid"),e=this.CryptoJS.AES.decrypt(t,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8);this.agente=e},methods:{search:Object(l["debounce"])((function(t){this.term=t}),400),getTrendIcon:function(t){return"up"===t.trend?"entypo entypo-up-open-mini":"down"===t.trend?"entypo entypo-down-open-mini":"entypo entypo-minus"},getTrendColor:function(t){return"up"===t.trend?"primary":"down"===t.trend?"danger":"grey"},loadTable:function(){var t,e,a,o,n;return c.a.async((function(r){while(1)switch(r.prev=r.next){case 0:return t=localStorage.getItem("ttid"),e=this.CryptoJS.AES.decrypt(t,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),a=e,o={headers:{Authorization:"Bearer ".concat(a)}},r.prev=4,r.next=7,c.a.awrap(u.a.get("".concat(h,"/pedidos"),o));case 7:n=r.sent,this.pedidos=n.data.data,r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](4),console.log(r.t0);case 14:case"end":return r.stop()}}),null,this,[[4,11]])},changeStatus:function(t){this.showChangeStatus=!0,this.id_pedido=t},ShowReasons:function(t){var e,a,o,n,r;return c.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return this.showObs=!0,e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n={headers:{Authorization:"Bearer ".concat(o)}},s.prev=5,s.next=8,c.a.awrap(u.a.get("".concat(h,"/pedidos/").concat(t),n));case 8:r=s.sent,this.dataReasons=r.data.data,s.next=15;break;case 12:s.prev=12,s.t0=s["catch"](5),console.log(s.t0);case 15:case"end":return s.stop()}}),null,this,[[5,12]])},SavedStatus:function(){var t,e,a,o,n,r;return c.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return t=this.id_pedido,e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n={headers:{Authorization:"Bearer ".concat(o)}},r={idEstado:this.status,razonRechazo:this.reasons,obsDistribuidor:this.comments},s.prev=6,s.next=9,c.a.awrap(u.a.put("".concat(h,"/pedidos/").concat(t),r,n));case 9:this.showChangeStatus=!1,s.next=15;break;case 12:s.prev=12,s.t0=s["catch"](6),console.log(s.t0);case 15:case"end":return s.stop()}}),null,this,[[6,12]])},ShowDetails:function(t){var e,a,o,n,r;return c.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return this.showDetailsOrder=!0,e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n={headers:{Authorization:"Bearer ".concat(o)}},s.prev=5,s.next=8,c.a.awrap(u.a.get("".concat(h,"/pedidos/detalle/orden/").concat(t),n));case 8:r=s.sent,this.DetallesOrden=r.data.data,s.next=15;break;case 12:s.prev=12,s.t0=s["catch"](5),console.log(s.t0);case 15:case"end":return s.stop()}}),null,this,[[5,12]])},DownloadPdf:function(t){var e,a,o,n,r,s,i,l,d,A,v,g;return c.a.async((function(f){while(1)switch(f.prev=f.next){case 0:return e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n={headers:{Authorization:"Bearer ".concat(o)}},r=[{title:"Cliente",dataKey:"nombreNegocio"},{title:"Nit",dataKey:"nit"},{title:"Asesor",dataKey:"savedBy"},{title:"Fecha de Ingreso",dataKey:"ingresoFH"},{title:"Distribuidor",dataKey:"distribuidor"},{title:"Agente",dataKey:"asesordistribuidor"},{title:"Estado del Pedido",dataKey:"estado"},{title:"Total",dataKey:"valorPedido"}],s=[{title:"Referencia",dataKey:"referencia"},{title:"Cantidad",dataKey:"cantidad"},{title:"Valor",dataKey:"valor"}],f.prev=6,f.next=9,c.a.awrap(u.a.get("".concat(h,"/pedidos/pdf/").concat(t),n));case 9:return i=f.sent,f.next=12,c.a.awrap(u.a.get("".concat(h,"/pedidos/detalle/orden/").concat(t),n));case 12:l=f.sent,d=i.data.data,A=l.data.data,v=new p["default"]({orientation:"p",unit:"pt",format:[700,800]}),g="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXEAAABjCAYAAABt7jCAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEQhJREFUeNrsnU1uG8kVx5+DQTDJZmh4NYvA7ROYwsBrtS4woU4g8gSSDjAgidkmIHUCUieQPBcgtchqEpA+gWhkljHMGSCAkY1ST341LLX7s7q7utj8/4CG6Rab3V0f/3r16lUVEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcLA8O4B3DOVglnJoeuroyue5OjbyuSt/i16T9H0AAAA1MVPHgxxh5G/3xt86CddoMee/f5RzHyPfBwAAUBMLQ5AD43xgnF8Z56NirRkZ3x8hWQEAwA0PMYLMXCSIct84P4MVDgDwmUPxiTNbdawjlri2zNfy96TzLNrdhN8BAABQEz3Dqp7ksNAD4/y9cd70nQdIVgCAL/yh5e/XNT6/j4i75jbh/LX82zeEe06ISAEAAGfcUHxkysQ43zfOr2IsbljhAABv+arl78dW81I+m37sjnFeW+Is0Fs5v5Gja3y+gxUOAPCNtg9sauvbHIxMGqTs0i7qRA9omtb7EsUFAADcwaKs3SAL43xSaGF04k+YcD0AAAAHJEWmmH7yrmGx63M3cs6cJBQiOQEAwC0jQ4QvjPNxoYXmNPs+rHAAAGieuMgU0zqfGd+NTrOPWzsFAACAQ8xwQT1gGRda2I8Ie0DxE34AAMA72hxiqMMF9Wei5NBCfe5aLG/9/ysUEQAAAAAAAAAAADylLZN9+uo4i5w7oc/ukxvj3IA+hxWey/83cu5GvsuzMqeRa6qAf5fdN1j9EAAAEY9hpI6h8f+liHhIuxBB9os/p8+Dl305N5bv6u8c0Wef+LCm5+R7XWaIuTmjNC9YHhfUjTmjOS8bqnmpiu+v/qXrS9LzcZ3b/HT+3aatGdPWgU1zbXCNHsgMje+w1a0nAs2lwJ3X+Fx875VY//OUylI0Nl03WgDUxYSKT3obUw27YIlw96SuZhk8Q7lmIxpwrQS9VQZPW5eifRcj4nf0dMMHLeo9EXQucBfkZtceszcAAMgv4FxH76UOFemxBlK/V+o3FuoIIOJ+o7tOLyOWeDdiJfREtK9EyM8dPuOMMJ0fgNzWtzpW0iMoa2hxvbtXv9cKQ6rtIq5bW70q4bEh6PydM9q5VVxZ4VEhBwCkC3hXrO9u1fWvDULeVp+4ubws89ZogUks70D+P5Bz5w08Jz8DF6I5qioA8Ra4GDt5DaylGGjmTl7HlBwwwEK+3OeBz7YPbHYMy1tn4loy+kI+s4COqLkd7M8h4gAQPXx4rJ88EMluzvmzF48G1iTDAt/SbsBymaNBYMPtr7RzpZIYUiOIuL9WuA6/6xlWuBbPgWTkeYPPq0OjtqjG4IAFvE9P/d1XSnRDSg8A4HGtqRLvXHVHvncrx0D9fq/hug8RL2CFa7HciNWrPy8btsI1IT3dsBmAQ7PAzfGhtbLC199fJY4ZsVE2yBMquP3h8bfPYqz5Lf3nO45iu+z8uN9zLNoo4neGMJr/Z7/YdYYVroX9PX25HRsXgpdi0Qc1WOMQcXCIAh6dVc28FddHnBV+KwK+zRBvrv9DSo8Ae5zYp77LIn6lxHwOEffLEv8mYolzZp4a39nQzg82pt1knyS0qF/Sbup+H9UQgFJcxBhFtwniO1fiPchhfY+o2Kzrx56Auo6vGSgxX+5TArYxxND0iZsbHs/lc1dEW4v5cxHzTcF7cGE6IfiyAShjhUfFdsuuFNqFA/9e53IK+Izsl83gxmTBv6GOzr6kYxtFXIsxZ4IZWjg2BFgL77TkvbjFfkU1rw8BQIut8DQjzKzTmctKKOG9qKh33Bcx7+5DIrZZxE0/87ZGoeXfPkV9BKAwZzHn7mLO5fWBTyp8tu6+CHnbfOJro1tkruw3dXDfOfnhIw/kMCc3bOSocrVDmw2kr+lpTHxPnvE4kpaXkeuqCAXb0G5J4DpdYDpkVOeD2ftb13BvM59Dw7BYG71F75CIlCDFCNN/m2fFfwt1zH7uiJCf+BzB0jYRN1cvLBPtEUiFeG1UkG7EoudMfUe7GWJXDYp4QLu1WIIcacTP/LakoIUW19xJxbgQUc7rd+xSNevM9MVau6TqJljpFfX0BJI8jQmn/6DEPXXYXEj5pqKb+b3xpK72MnrS2hC7zOlGCWIMKz7eRxpPXY6Oc5YpLeSvlJB7Of7VVku8m9Aty1OwzlMyt2MUljBS8JoMEQwKNCBadHoi/CxmY0eVmxvFFRUP0XxdsXU1k0o8KJnmQ4uGW+eVzb37cs+i6RfKMRFBH3tgoR/nqMtvc07kOTeu4d7erRLcTUqDZjYAPWkQe1lCTp/3G/COtvnEfzUSvYio6jW8bywtvoDiB2n2ARYGXlxoRPVPerKNse/U9N4zy2eZSJq56nmF0vjNqPwchdAo601GYGT1IPTCdFlWeF8MEHZ5HKljmiLgX2bmj4+Cz2NarzI0oyuhixDxmlnGuFayGEkFCemwGUrl9nEgp6680e6VIsKzctxgj2rKl540RL2G8jSrAbnKaYUvlQiflI3tZuEXMT9J6ZXyxKDAt8rRNhHXmT7P+f0yMaVtRPdIfGrQ6rYWL3IKZF/SJnD43jc1l099D6e9yIcP2eVLCXiunnQRqzuLm5+/7ktjcJRilXunF20Tce0Tz5Ox2F0nuWIvPEobFz2DrIrZp2LLoVaVB66s5AlVG57ne34ncayEfLX4/utArPJxXA/Gt4lAbRLxTcFCCwHPTiMfXCsuLN9eikBHF2dqa9pfeFInXjd47ytJ95VY5SP6cgC641lP9SBFvEf7Owjp2iJvevDLlYhTQsXUFrFLRg2KadF9K13lgxNO33wyQxFnSshnsijWwKPeQqtFPE8wfoewJVpRAW06vVxZZt0EUXPZiOlNEZrERcOdVleDhw+NDh6az9ZXQj4SIR/7WknbFCf+a84uY4dAUVcDW0fLBntYRe7drSiPQ3IfueGDXzqQejKq6wbPXtBWCXUaHPd92dD730V6A0Ml5OvOm0+j7Q+PS1H3faugbRLxLEu8Q4hEsWVYs4hv5Iizhm0q800FAuy6BxKSP75WFtEp1bs8wTLlfftK5Mcs9p6kB7tWlvTTJ70M9RwiXg9ZGV6lH1yLTkiHQUi7pX2rzC/uokanggcFn6kTacjXYk31Sr6v6y69TwaG3pChzjWH7ih9ZnStvYGMxmUY9zwy0OndrM02+cSzLMWzikSH1x/n2V08KeCZ/Lv0LC3YUtCz0J7LM5a1rM4rfr5X8kybmAYyTVzZyn6gzwOOE6lw+uC/3VfglihbVvQiXieS/joPkpY3CEoaBFz+BiIwukxeUrmlFM4dlNHURk0WyfKFMwK1kmVld6Xi2x4ryvaz9kv8/igiVLa/c0/pI+c62sL2t01sn9HGTdEt8dw2efDR8jc+5uwB9GPKr+39+jncQrZpYvZGFiXT9AuUSC/U8ZByrGTjCGdwaKE6HhIOL5elbYslntXtK2PlbCjfDj5zam4wRvcUjjJcHtsSPYeAyodWaYuxCH1yuyyC7cDohtJn+qVZoceWz3qaw6IdkH1kRd1pfpkjL1wP9gYZzwMRb4jjEtcOCrghpg26Vk4LPGeRd8pbwPNwVfD7E2pmgNE2/W3dFzbiUGQlwhHZjWfUGt4p27BlCTkPctZSBv79xxdxPYWXNZZ/iHgJbLtkGwtRvm7g/dYFn3NDdkvnlrVEityzT81MyrIpK3MqN+hrIw5FBx2vGsjvPEI+zdGbqFzIlYBz+Rrui7UNEbfPmKWja8ry1tE1LvOrqUlGLy2ucd1wLy16Ure+ZrYS8kGO3mFffOSlrWEl4LFumpufvw4ytGLjY/rBEk/nvaX1vg9sPX62Jie9BC2tAz7nN/3y7Yvb3/7+5yNKj6J6XNdECfmopAWuAxWidbW3j3X7KwJVW2UBkq0UeoYoxO6w6P72tz/N1DH+y/8+PJflavUgszmm9bhjF4cfik+9iICz+A9TRDktrHJ7+ubT0seEOxQRX5OdSyV0dE1ZbAagfPX92cbjbipqQN9R8YlCnOcuK3i3RfkdNYBmSmyHv3xLLOaVTDZSvxdS/MqQvzcCHFqYUX68dUcdijtlW6JQ9QteM2zgWW22PTt3mI51NoLmBCye6HLZgDVdZNPnKtK1Y1Eufc1vU1C3ETG/Z+tZHVaNM4u3OnhsJWlnpLsC9dbbBbDaIuJZFX9T4rcnBSroqAJr0DbKochAoO1zrmvOx6Ix2gN5F1NsplRuA2Qbi1rvu+kyz4uUy5DsFm5656oCK6ub8/AqxohicWUxX6ljoo5ekqir8x0Rbv7ePaVvbrLVec0rFWbUh/npm08b8pRDEfEyhbFD+fY4HFF1618sLdMgz9KpFyWes26XQREBZ+Gbp3R9bZ/VtqFisci7jGuQYhEWLZdBjnJx42l+R4V8lJL+XSm7NyLqD2KpL0Tg9QzWhXwvK11uueFQAh5m1IctNTuJ76DcKd0aC6Oe9h31q+lu7YKqXcDobQkhWSVYH6HxDjb45hPMSqM7y9/dlnhXvflwkmWnQ9tWFaWt3rh5FNN4BNKoL8jO1bOlZsJlTwo0pAHtFkIr+m5jmUaf1cANlBXu9WD3oYj4msqHB+mV1bjSmGtXzKj6wcwygqkrr14kamFYKGWe00VceZHKkhU59E1D76qXPL430l3nwYri17QvUz71/fTvL+Te91Ru7etGGm1xq5zUfP/xP//x306OBm6sBNzbAc02ivixj4XSkg1Vs2ZxKEfHk+ep0pWRti9mh8otRXtL1QzqdQrkQRUDZ12qbhndxgbyWMjVcUr1DFLPlYAvcwg4+8FH+yAWbRLxLCvzas/eZ3ygz5JXyPVWe3EVcVJSyLYNlJdb8mcyydyHZ5EQw1dS/qoQ86kS8Lc5BHyqBHywL0LRJhEPKHvK7HyP3oefd+rBc6wdp1uRKew92vmEQ3FVlHUjaEaOhWzrScPty3OYVvlIxPyS7Aae2fI+UQLOn9MGn/nd2Qd+uUc60bo48ayJIuM9e5+xBxaRa4ukqNuLG+8h7QZtgz1+9zk17/bzocwliflUHUeGoM8pfvBVD8qyEXSkxJt94BNKX1CNG4cTJeDzPdOI1s3Y7FF6ONBGCum+7LXJhfGUvoxmcIWt5VO2BzInPzakXTZQXgbSowwaeN+5J72/LEHP1UuVBa2GGWXpseehxHtKe0rbLPGAsn3jowaEqaw7Y3BgFdqnHtOI3LqTdMO9baCcXbZMD85TBFzXq1f7LOBttMSZM8qOb+UQJvaddvbknbSIzBzer8mBHd96TDotXPUO1lJGF47KqL5fqxb/Yt+2ssav6Wl0EJetpc8zMA8VtpaS9gZMgrustnsp1rm/Yxqhg2fOK1Q2v12UmWd5cFHh/fL2LFc1v3dew2BRY7kGcKfEVv481kfWnpS+wT0MHtSpY/BLp8fco/cdePY8U7FYXVlxG8mTOtxL2m0zIAA8tMSLWJR68aIyO8yXud7WYgmpmh3gbUPyXFjiafnbVG/IfKYyvaKiBBX1TD5S/DR9WOLAOxH/SMXWVNCVJG/FvDHEL2xAxE0xn1kIyg2V8/G6FPG8+aOntU8c5kFf0rKokJZJh4k0vkXumTTlHyK+5zxryXtwRTpL6DJeWnR/e9IAvKanAyLvabcp8TZSscoI4pKqWWxIT7uO7oai3SW/VnivhcU1JxXldyhpHkg+6LVHNsbfQ8d50DHS/yXFr1So45ercuF1aReO+Doi0Gnl1YYJFV9o6pr2a4IdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVMr/BRgAGqg6zuR1QGkAAAAASUVORK5CYII=",v.text("Pedido y Detalles",280,40),v.addImage(g,"PNG",20,5,160,50),v.autoTable(r,d,{styles:{halign:"center",overflow:"linebreak",tableWidth:"auto",lineWidth:1},headStyles:{fillColor:[241,196,15],cellPadding:2,lineWidth:1,valign:"middle",fontStyle:"bold",halign:"center",rowHeight:20},bodyStyles:{margin:20},margin:{top:60}}),v.autoTable(s,A,{styles:{halign:"center",overflow:"linebreak",tableWidth:"auto",lineWidth:1},headStyles:{fillColor:[241,196,15],cellPadding:2,lineWidth:1,valign:"middle",fontStyle:"bold",halign:"center",rowHeight:20},bodyStyles:{margin:20},margin:{top:60}}),v.save("pedido.pdf"),f.next=27;break;case 24:f.prev=24,f.t0=f["catch"](6),console.log(f.t0);case 27:case"end":return f.stop()}}),null,this,[[6,24]])},ShowAgent:function(t){var e,a,o,n,r;return c.a.async((function(s){while(1)switch(s.prev=s.next){case 0:return this.ShowDataAgent=!0,this.id_agent=t,e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n={headers:{Authorization:"Bearer ".concat(o)}},s.prev=6,s.next=9,c.a.awrap(u.a.get("".concat(h,"/pedidos/asesor/distri"),n));case 9:r=s.sent,this.allAgent=r.data.data,s.next=16;break;case 13:s.prev=13,s.t0=s["catch"](6),console.log(s.t0);case 16:case"end":return s.stop()}}),null,this,[[6,13]])},SavedAgent:function(){var t,e,a,o,n,r,s,i;return c.a.async((function(l){while(1)switch(l.prev=l.next){case 0:return t=this.id_agent,e=localStorage.getItem("ttid"),a=this.CryptoJS.AES.decrypt(e,"4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9").toString(this.CryptoJS.enc.Utf8),o=a,n=this.agentDistri.split("-"),r={asesordistribuidor:n[0]},s={email:n[1]},i={headers:{Authorization:"Bearer ".concat(o)}},l.prev=8,l.next=11,c.a.awrap(u.a.put("".concat(h,"/pedidos/asesor/distri/").concat(t),r,i));case 11:return l.next=13,c.a.awrap(u.a.post("".concat(h,"/messages"),s,i));case 13:this.ShowDataAgent=!1,l.next=19;break;case 16:l.prev=16,l.t0=l["catch"](8),console.log(l.t0);case 19:case"end":return l.stop()}}),null,this,[[8,16]])}}},g=v,f=a("2877"),m=Object(f["a"])(g,r,s,!1,null,null,null),b=m.exports,D={name:"pedidos",components:{PedidosTable:b}},w=D,y=(a("6624"),Object(f["a"])(w,o,n,!1,null,null,null));e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-148700e8.c3f1abb7.js.map