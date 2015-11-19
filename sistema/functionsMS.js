var ip = '173.204.12.100';
var url = "http://" + ip + ":8895/";

// var snd = new Audio("http://" + ip + ":8898/alerta.wav");

var usuarioActivo = [];
var datosUsuario = [];
var personal = [];
var correlativo = 0;
var catalogoActual = "";
var cargando = 1;

var systemSettings = {
	"activeForm": "fv",
	"key0": "value0",
	"key1": "value1",
	"key2": "value2"
}

var descriptorDeTabla = {
	"nombreTabla": "",
	"mapeoCampos": "",
}

var isMobile = false;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

var tablasSistema = 0, total_totalColumns = 0;

function activeForm(af) {
	systemSettings.activeForm = af;
	if (catalogoActual != "") {
		pedircatalogo(catalogoActual);
	}
}

function isStorageSupported(type) {
	if ((type == 0) && (typeof (sessionStorage) === "undefined")) {
		createNotification("sessionStorage is no suppored ...");
		return false;
	}
	if ((type == 1) && (typeof (localStorage) === "undefined")) {
		createNotification("localStorage is no suppored ...");
		return false;
	}
	return true;
}

function isInformationFromLocalStorage(localkey) {
	if (isStorageSupported(1)) {
		if (localStorage.getItem(localkey)) {
			return true;
		}
	}
}

function storeInformationInLocalStorage(localkey, localvalue) {
	if (isStorageSupported(1)) {
		localStorage.setItem(localkey, localvalue);
	}
}

function readInformationFromLocalStorage(localkey) {
	if (isStorageSupported(1)) {
		return localStorage.getItem(localkey);
	}
}

function removeInformationInLocalStorage(localkey) {
	if (isStorageSupported(1)) {
		localStorage.removeItem(localkey);
	}
}

function isInformationFromSessionStorage(localkey) {
	if (isStorageSupported(0)) {
		if (sessionStorage.getItem(localkey)) {
			return true;
		}
	}
}

function storeInformationInSessionStorage(localkey, localvalue) {
	if (isStorageSupported(0)) {
		sessionStorage.setItem(localkey, localvalue);
	}
}

function readInformationFromSessionStorage(localkey) {
	if (isStorageSupported(0)) {
		return sessionStorage.getItem(localkey);
	}
}

function removeInformationFromSessionStorage(localkey) {
	if (isStorageSupported(0)) {
		return sessionStorage.removeItem(localkey);
	}
}

function hexEncode(stringtoencode) {
	var hex, i;
	var result = "";
	for (i = 0; i < stringtoencode.length; i++) {
		hex = stringtoencode.charCodeAt(i).toString(16);
		result += ("000" + hex).slice(-4);
	}
	return result
}

function hexDecode(stringtodecode) {
	var j;
	var hexes = stringtodecode.match(/.{1,4}/g) || [];
	var back = "";
	for (j = 0; j < hexes.length; j++) {
		back += String.fromCharCode(parseInt(hexes[j], 16));
	}
	return back;
}

function showDiff(fechaapertura) {
	var date1 = new Date();
	var date2 = new Date(fechaapertura);
	var diff = (date2 - date1) / 1000;
	var diff = Math.abs(Math.floor(diff));
	var days = Math.floor(diff / (24 * 60 * 60));
	var leftSec = diff - days * 24 * 60 * 60;
	var hrs = Math.floor(leftSec / (60 * 60));
	var leftSec = leftSec - hrs * 60 * 60;
	var min = Math.floor(leftSec / (60));
	var leftSec = leftSec - min * 60;
	if (min < 10) {
		return hrs + ":0" + min;
	} else {
		return hrs + ":" + min;
	}
}

function fechaYHora() {
	var d = new Date();
	var dia = d.getFullYear();

	if (d.getMonth() < 10) {
		dia += "/0" + d.getMonth();
	} else {
		dia += "/" + d.getMonth();
	}

	if (d.getDate() < 10) {
		dia += "/0" + d.getDate();
	} else {
		dia += "/" + d.getDate();
	}

	var hora = "";
	if (d.getHours() < 10) {
		hora += "0" + d.getHours();
	} else {
		hora += d.getHours();
	}

	if (d.getMinutes() < 10) {
		hora += ":0" + d.getMinutes();
	} else {
		hora += ":" + d.getMinutes();
	}
	var respuesta = {
		"fecha": dia,
		"hora": hora
	};
	return respuesta;
}

function createNotification(msg) {
	if(isMobile){
		alert(msg);
	}else{
		if (!"Notification" in window) {
			console.log("Este navegador no soporta notificaciones.");
		} else if (Notification.permission === "granted") {
			var img = '/logo2.png';
			var text = msg;
			var notification = new Notification('Atencion', {
				body: text,
				icon: img
			});
			setTimeout(function () {
				notification.close();
			}, 5000);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (!('permission' in Notification)) {
					Notification.permission = permission;
				}
				if (permission === "granted") {
					var img = '/logo2.png';
					var text = msg;
					var notification = new Notification('atención', {
						body: text,
						icon: img
					});
					setTimeout(function () {
						notification.close();
					}, 5000);
				}
			});
		}
	}
}

function playAlerta() {
	// snd.play();
}

function salir() {
	if (isInformationFromSessionStorage('usuario') & isInformationFromSessionStorage('clave')) {
		removeInformationFromSessionStorage('usuario');
		removeInformationFromSessionStorage('clave');
	}
	localStorage.clear();
	sessionStorage.clear();
	window.location.href = "index.html";
	// location.reload();
}

////////////////////////////

jx = {
	getHTTPObject: function () {
		var http = false;
		if (typeof ActiveXObject != 'undefined') {
			try {
				http = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					http = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (E) {
					http = false;
				}
			}
		} else if (window.XMLHttpRequest) {
			try {
				http = new XMLHttpRequest();
			} catch (e) {
				http = false;
			}
		}
		return http;
	},
	load: function (url, callback, format, method, opt) {
		var http = this.init();
		if (!http || !url) return;
		if (http.overrideMimeType) http.overrideMimeType('text/xml');
		if (!method) method = "POST";
		if (!format) format = "text";
		if (!opt) opt = {};
		format = format.toLowerCase();
		method = method.toUpperCase();
		var now = "uid=" + new Date().getTime();
		url += (url.indexOf("?") + 1) ? "&" : "?";
		url += now;
		var parameters = null;
		if (method == "POST") {
			var parts = url.split("\?");
			url = parts[0];
			parameters = parts[1];
		}

		http.open(method, url, true);
		if (method == "POST") {
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// http.setRequestHeader("Content-length", parameters.length );
			// http.setRequestHeader("Connection", "close");
		}
		var ths = this;
		if (opt.handler) {
			http.onreadystatechange = function () {
				opt.handler(http);
			};
		} else {
			http.onreadystatechange = function () {
				if (http.readyState == 4) {
					if (http.status == 200) {
						var result = "";
						if (http.responseText) result = http.responseText;
						if (format.charAt(0) == "j") {
							result = result.replace(/[\n\r]/g, "");
							result = eval('(' + result + ')');
						} else if (format.charAt(0) == "x") {
							result = http.responseXML;
						}
						if (callback) callback(result);
					} else {
						if (opt.loadingIndicator) document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator);
						if (opt.loading) document.getElementById(opt.loading).style.display = "none";
						if (error) error(http.status);
					}
				}
			}
		}
		http.send(parameters);
	},
	bind: function (user_options) {
		var opt = {
			'url': '',
			'onSuccess': false,
			'onError': false,
			'format': "text",
			'method': "POST",
			'update': "",
			'loading': "",
			'loadingIndicator': ""
		}
		for (var key in opt) {
			if (user_options[key]) {
				opt[key] = user_options[key];
			}
		}
		if (!opt.url) return;
		var div = false;
		if (opt.loadingIndicator) {
			div = document.createElement("div");
			div.setAttribute("style", "position:absolute;top:0px;left:0px;");
			div.setAttribute("class", "loading-indicator");
			div.innerHTML = opt.loadingIndicator;
			document.getElementsByTagName("body")[0].appendChild(div);
			this.opt.loadingIndicator = div;
		}
		this.load(opt.url, function (data) {
			if (opt.onSuccess) opt.onSuccess(data);
			if (opt.update) document.getElementById(opt.update).innerHTML = data;
			if (div) document.getElementsByTagName("body")[0].removeChild(div);
			//if(opt.loading) document.getElementById(opt.loading).style.display="none"; 
		}, opt.format, opt.method, opt);
	},
	init: function () {
		return this.getHTTPObject();
	}
}

function aproximaTarimas(val){
	var a = parseFloat(val) - parseInt(val);
	if( a != 0 ) val = parseInt(val)+1;
	return parseInt(val);
}

function ajax_handler(data) {

	storeInformationInLocalStorage(data.objeto, data.JSON_data);
	var objetoLargo = JSON.parse(data.JSON_data);
	if(document.getElementById(data.objeto)) document.getElementById(data.objeto).innerHTML = objetoLargo.length;
	var mensaje_evento = "";

	if (data.objeto == "ingreso") {
		storeInformationInSessionStorage(data.objeto, data.JSON_data);
		datosUsuario = JSON.parse(data.JSON_data);
		usuarioActivo = datosUsuario;
		if (datosUsuario.autorizado == 1) {
			window.location.href = "indexMS.html";
		} else {
			window.location.href = "index.html";
		}
	}

	if (data.objeto == "borrarRecord") {
		if (catalogoActual != "") {
			setTimeout(function () {
				pedircatalogo(catalogoActual);
			}, 1500);
		}
		mensaje_evento = "Registro borrado satisfactoriamente.";
	}

	if (data.objeto == "guardarDRecord") {
		if (catalogoActual != "") {
			setTimeout(function () {
				pedircatalogo(catalogoActual);
			}, 1500);
		}
		mensaje_evento = "Registro almacenado satisfactoriamente.";
	}

	if (data.objeto == "indexMenuMantenimiento") {
		if (isInformationFromSessionStorage("ingreso")) {
			f_indexMenuMantenimiento();
		} else {
			createNotification("Atencion: cargar().MenuPrincipal()");
		}
	}

	if(cargando == 0){
		if(data.objeto == 'Resumen'){
			var v_Resumen = JSON.parse(data.JSON_data);
			var t_tarimas = 0; t_cajas = 0; t_latas = 0;
			var v_ResumenHTML = "<h3>RESUMEN</h3><table class='tablaResumen'>";
			v_ResumenHTML += "<tr class='tituloTablaResumen'><td>ORIGEN</td><td>CODIGO</td><td>DESCRIPCION</td><td>TARIMAS RECIBIDAS</td><td>CAJAS RECIBIDAS</td><td>LATAS RECIBIDAS</td></tr>";
			for(var i=0; i<v_Resumen.length;i++){
				if(v_Resumen[i].origen.toLowerCase() == 'ambev'){
					v_ResumenHTML += "<tr style='background-color:#fedcba;'>";
				}else{
					v_ResumenHTML += "<tr style='background-color:#abcdef;'>";
				}
				v_ResumenHTML += "<td>"+v_Resumen[i].origen+"</td>";
				v_ResumenHTML += "<td>"+v_Resumen[i].codigo+"</td>";
				v_ResumenHTML += "<td>"+v_Resumen[i].descripcion+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+aproximaTarimas(v_Resumen[i].tarimas_recibidas).toLocaleString()+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(v_Resumen[i].cajas_recibidas).toLocaleString()+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(v_Resumen[i].latas_recibidas).toLocaleString()+"</td></tr>";

				t_tarimas = parseInt(t_tarimas)+parseInt(aproximaTarimas(v_Resumen[i].tarimas_recibidas)); 
				t_cajas = parseInt(t_cajas)+parseInt(v_Resumen[i].cajas_recibidas); 
				t_latas = parseInt(t_latas)+parseInt(v_Resumen[i].latas_recibidas); 
			}
			v_ResumenHTML += "<tr style='background-color:#abcdef;'><td>TOTAL</td><td>&nbsp;</td><td>&nbsp;</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+t_tarimas.toLocaleString()+"</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+t_cajas.toLocaleString()+"</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+t_latas.toLocaleString()+"</td></tr>";

			document.getElementById('contenidoReporte').innerHTML = v_ResumenHTML;
		}else if(data.objeto == 'InventarioSalidas'){
			var v_Resumen = JSON.parse(data.JSON_data);
			var t_tarimas = 0; t_cajas = 0; t_latas = 0;
			var v_ResumenHTML = "<h3>RESUMEN</h3><table class='tablaResumen'>";
			v_ResumenHTML += "<tr class='tituloTablaResumen'><td>ORIGEN</td><td>BODEGA</td><td>CODIGO</td><td>DESCRIPCION</td><td>TARIMAS RECIBIDAS</td><td>CAJAS RECIBIDAS</td><td>LATAS RECIBIDAS</td><td style='width:180px;'>PREPARAR TARIMAS</td><td style='width:180px;'>PREPARAR CAJAS</td></tr>";
			for(var i=0; i<v_Resumen.length;i++){
				t_tarimas = parseInt(t_tarimas)+parseInt(aproximaTarimas(v_Resumen[i].tarimas_recibidas)); 
				t_cajas = parseInt(t_cajas)+parseInt(v_Resumen[i].cajas_recibidas); 
				t_latas = parseInt(t_latas)+parseInt(v_Resumen[i].latas_recibidas); 
				if(v_Resumen[i].origen.toLowerCase() == 'ambev'){
					v_ResumenHTML += "<tr style='background-color:#fedcba;'>";
				}else{
					v_ResumenHTML += "<tr style='background-color:#abcdef;'>";
				}
				v_ResumenHTML += "<td>"+v_Resumen[i].origen+"</td>";
				v_ResumenHTML += "<td>"+v_Resumen[i].bodega+"</td>";
				v_ResumenHTML += "<td>"+v_Resumen[i].codigo+"</td>";
				v_ResumenHTML += "<td>"+v_Resumen[i].descripcion+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+aproximaTarimas(v_Resumen[i].tarimas_recibidas).toLocaleString()+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(v_Resumen[i].cajas_recibidas).toLocaleString()+"</td>";
				v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(v_Resumen[i].latas_recibidas).toLocaleString()+"</td>";
				v_ResumenHTML += "<td>"; 
				v_ResumenHTML += " <input type='number' id='id_t"+v_Resumen[i].codigo+"' value='' placeholder='0.00' min='0' max='"+aproximaTarimas(v_Resumen[i].tarimas_recibidas)+"' step='0.01' style='width:180px;'>";
				v_ResumenHTML += " <input style='width:180px;' type='button' value='PREPARAR TARIMAS' onclick='prapararPEdido("+v_Resumen[i].codigo+",\""+v_Resumen[i].origen+"\")'>";
				v_ResumenHTML += "</td><td>";
				v_ResumenHTML += " <input type='number' id='id_c_"+v_Resumen[i].codigo+"' value='' placeholder='0.00' min='0' max='"+aproximaTarimas(v_Resumen[i].cajas_recibidas)+"' step='0.01' style='width:180px;'>";
				v_ResumenHTML += " <input style='width:180px;' type='button' value='PREPARAR CAJAS' onclick='prapararPEdido("+v_Resumen[i].codigo+",\""+v_Resumen[i].origen+"\")'>";
				v_ResumenHTML += "</td></tr>";
			}
			v_ResumenHTML += "<tr style='background-color:#abcdef;'><td>TOTAL</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(t_tarimas).toLocaleString()+"</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(t_cajas).toLocaleString()+"</td>";
			v_ResumenHTML += "<td style='text-align:right;'>"+parseFloat(t_latas).toLocaleString()+"</td>";
			v_ResumenHTML += "<td>&nbsp;</td><td>&nbsp;</td></tr>";
			v_ResumenHTML += "</table>";
			document.getElementById('contenidoReporte').innerHTML = v_ResumenHTML;
		}else{
			var tbl_regexp = new RegExp(data.objeto);
			if (tablasSistema.search(tbl_regexp) > -1) {
				disruptor(data.objeto);
			}
		}
	}

	if (mensaje_evento != "") {
		createNotification(mensaje_evento);
	}
}

function prapararPEdido(codigoProducto, origen){
	var cantidadAPreparar = document.getElementById('id_'+codigoProducto).value;
	console.log(codigoProducto,origen,cantidadAPreparar);
}

function ajax_load(url, e) {
	window.data_format = 'json';
	jx.bind({
		"url": url,
		"onSuccess": ajax_handler,
		"onError": function (status) {
			createNotification("Something when wrong. Error : " + status)
		},
		"format": "json",
		"method": "post",
		"loading": "loading"
	});
	if (!e) var e = window.event;
	if (!e) return false;
	if (e.stopPropogation) {
		e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function f_indexMenuMantenimiento() {
	if (isInformationFromLocalStorage('indexMenuMantenimiento')) {
		datosUsuario = readInformationFromLocalStorage("ingreso");
		console.log(datosUsuario);
		datosUsuario = JSON.parse(datosUsuario);
		usuarioActivo = datosUsuario.data;
		createNotification("Registrando el ingreso de: "+usuarioActivo.nombre);
		document.getElementById('usuarioActivo').innerHTML = usuarioActivo.nombre;
		var tbl_indexMenuMantenimiento = readInformationFromLocalStorage('indexMenuMantenimiento');
		var agregarAMenuPrincipal = "";
		tablasSistema = tbl_indexMenuMantenimiento;
		var tablasMenu = JSON.parse(tbl_indexMenuMantenimiento);
		for (var i = 0; i < tablasMenu.length; i++) {
			if (tablasMenu[i].tipo == 0) {
				agregarAMenuPrincipal += "<li onclick='pedircatalogo(\"" + tablasMenu[i].nombreTabla + "\");'>" + tablasMenu[i].tituloLink + " <span id='"+tablasMenu[i].nombreTabla+"'></span></li>";
			}
		}
		agregarAMenuPrincipal += "<li onclick='salir();'>Salir</li>";
		document.getElementById("menuPrincipal").innerHTML += agregarAMenuPrincipal;
	} else {
		createNotification("Error Index Menu Mantenimiento");
	}
}

function postOnForm(rowid, totalColumns) {
	for (var i = 0; i < (totalColumns); i++) {
		if (document.getElementById("key_" + rowid + "_" + i)) var key = document.getElementById("key_" + rowid + "_" + i).innerHTML;
		if (document.getElementById("value_" + rowid + "_" + i)) var value = document.getElementById("value_" + rowid + "_" + i).innerHTML;
		if (document.getElementById("value_" + rowid + "_" + i)) document.getElementById("value_" + i).value = value;
	}
	jump("top");
}

function borrarRecord(recordRef) {
	var mantenimientoTabla = document.getElementById("mantenimientoTabla").innerHTML;
	var consultar = url + "borrarRecord?drecord=" + recordRef + "&tabla=" + mantenimientoTabla;
	ajax_load(consultar);
}

function guardarRecord() {
	var recordlength = parseInt(document.getElementById("recordlength").innerHTML);
	var mantenimientoTabla = document.getElementById('mantenimientoTabla').innerHTML;
	var stringRecordSet = "";
	for (var i = 0; i < recordlength; i++) {
		var key = document.getElementById("key_" + i).innerHTML;
		var value = document.getElementById("value_" + i).value;
		stringRecordSet += key + ":" + value + ";";
	}
	stringRecordSet += "tabla:" + mantenimientoTabla;
	stringRecordSet = hexEncode(stringRecordSet);
	var consultar = url + "guardarDRecord?drecord=" + stringRecordSet;
	ajax_load(consultar);
	pedircatalogo(mantenimientoTabla,1);
}


function registroNuevo(){

	var d = new Date();
	for (var i = 0; i < (total_totalColumns-2); i++) {

		var llave = document.getElementById("key_" + i).innerHTML;
		var placeHolder = llave;
		
		if (placeHolder == "c") {
			document.getElementById("value_" + i).value = 'AMBEV';
		}

		if (placeHolder == "d") {
			var fechaDeHoy = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
			document.getElementById("value_" + i).value = fechaDeHoy;
		}
		
		if (placeHolder == "e") {
			document.getElementById("value_" + i).onchange = function () {
				completarCodigo(this.value,this.id);
			}
		}

		if (placeHolder == "g") {
			document.getElementById("value_" + i).onchange = function () {
				var Lote = this.value;
				Lote = Lote.split('/');
				var loteForm = "O"+Lote[1]+Lote[0]+"80801";
				var idVal = this.id;
				idVal = idVal.split("_");
				document.getElementById(idVal[0]+"_"+(parseInt(idVal[1])+1)).value = loteForm;
			}
		}

		if (placeHolder == "i") {
			document.getElementById("value_" + i).onchange = function () {
				var CajasPorCamion = parseFloat(this.value) * parseFloat( cajasPorProducto(document.getElementById('value_5').value));
				var LatasPorCamion = parseFloat(this.value) * parseFloat( cajasPorProducto(document.getElementById('value_5').value))*24;
				document.getElementById('value_14').value = cajasPorProducto(document.getElementById('value_5').value);
				document.getElementById('value_15').value = CajasPorCamion;
				document.getElementById('value_16').value = LatasPorCamion;
			}
		}

		if (placeHolder == "m") {
			document.getElementById("value_" + i).onchange = function () {
				if( isNaN(parseFloat(document.getElementById('value_9').value)) === true ) document.getElementById('value_9').value = 0;
				if( isNaN(parseFloat(document.getElementById('value_10').value)) === true ) document.getElementById('value_10').value = 0;
				if( isNaN(parseFloat(document.getElementById('value_11').value)) === true ) document.getElementById('value_11').value = 0;
				if( isNaN(parseFloat(document.getElementById('value_12').value)) === true ) document.getElementById('value_12').value = 0;
				document.getElementById('value_13').value = 
				parseFloat(document.getElementById('value_9').value)-(parseFloat(document.getElementById('value_10').value)+parseFloat(document.getElementById('value_11').value)+parseFloat(document.getElementById('value_12').value));
			}
		}		

		if (placeHolder == "s") {
			document.getElementById("value_" + i).onchange = function () {
				completarLicenciaPiloto(this.value);
			}
		}

	}
	createNotification("A continuacion por favor siga las instrucciones.");
}

function recordSet2Schema(jsonRecordSet, indx, form, isHead, tipoRespuesta) {
	var columnas = JSON.stringify(jsonRecordSet);
	var reg = /","/;
	columnas = columnas.split(reg);
	var totalCampos = columnas.length;
	total_totalColumns = totalCampos;
	var trHtml = "";
	var recordRef = "";
	var rowid = indx;
	var columid = 0;
	
	if (form == 1){
		var formHtml = "<div class='dformHTML'><span style='display:none;' id='recordlength'>" + (totalCampos - 2) + "</span><table>";
		formHtml += "<tr><td> <input type='button' value='Guardar' onclick='guardarRecord();'> </td><td> <input type='button' value='Nuevo' onclick='registroNuevo();'> </td></tr>";
	}

	var icontinuo = 0;
	for (var j = 0; j < totalCampos; j++) {
		var campos = columnas[j];
		campos = campos.replace(/"/g, '');
		campos = campos.replace(/{/g, '');
		campos = campos.replace(/}/g, '');
		campos = campos.trim();
		campos = campos.split(":");
		if (campos[0] == '__fin' || campos[0] == 'tipo') {} else {
			if (form == 1) {
				if (j == 0) { // formulario
					formHtml += "<tr><td>" + campos[0] + "</td><td><spam id='key_" + icontinuo + "' style='display:none;'>" + campos[0] + "</spam><input id='value_" + icontinuo + "' type='text' value='' style='width:400px;'></td></tr>";
				} else {
					formHtml += "<tr><td>" + campos[1] + "</td><td><spam id='key_" + icontinuo + "' style='display:none;'>" + campos[0] + "</spam><input id='value_" + icontinuo + "' type='text' value='' style='width:400px;'></td></tr>";
				}
			}
			if (isHead == 1) {
				recordRef = campos[1]; // encabezado tabla
				var mapeoCampos = descriptorDeTabla.mapeoCampos;
				var mCPatern = campos[0];
				if (mapeoCampos.search(mCPatern) == -1) {
					descriptorDeTabla.mapeoCampos += icontinuo + "," + campos[0] + ":";
					// console.log(descriptorDeTabla.mapeoCampos);
				}
				trHtml += "<td style='text-align:center;'><span alt='" + campos[0] + "' title='" + campos[0] + "'>" + recordRef + "</span></td>";
			} else {
				if (j == 0) {
					recordRef = campos[1];
					if (tipoRespuesta == 1) {
						trHtml += "<td onclick='postOnForm(" + rowid + "," + totalCampos + ")' style='cursor:pointer;'><span id='key_" + rowid + "_" + icontinuo + "' style='display:none;'>" + campos[0] + "</span><span id='value_" + rowid + "_" + icontinuo + "' style='display:none;'>" + recordRef + "</span>" + recordRef + "<br><img src='Modify.png' alt='Editar' title='Editar' style='width:18px;height:18px;'></td>";

					} else {
						trHtml += "<td><span id='key_" + rowid + "_" + icontinuo + "' style='display:none;'>" + campos[0] + "</span><span id='value_" + rowid + "_" + icontinuo + "' style='display:none;'>" + recordRef + "</span>" + recordRef + "</td>";
					}
				} else {
					// console.log(campos[0]);
					if(campos[0]=='comandaJSON'){
						trHtml += "<td><span id='key_" + rowid + "_" + icontinuo + "' style='display:none;'>" + campos[0] + "</span><span id='value_" + rowid + "_" + icontinuo + "'>" + hexDecode(campos[1])  + "</span></td>";
					}else{
					   trHtml += "<td><span id='key_" + rowid + "_" + icontinuo + "' style='display:none;'>" + campos[0] + "</span><span id='value_" + rowid + "_" + icontinuo + "'>" + campos[1] + "</span></td>";
					}

				}
			}
			icontinuo++;
		}
	}

	if (isHead == 1) {
		trHtml += "<td>&nbsp;</td>";
	} else {
		if (tipoRespuesta == 1) {
			trHtml += "<td style='background-color:#ff0000;cursor:pointer;' onclick='borrarRecord(" + recordRef + ")'>X</td>";
		} else {
			trHtml += "<td style='background-color:#bbbbbb;'>&nbsp;</td>";
		}
	}
	if (form == 1) {
		formHtml += "<tr><td> <input type='button' value='Guardar' onclick='guardarRecord();'> </td><td> <input type='button' value='Nuevo' onclick='registroNuevo();'> </td></tr>";
		formHtml += "</table></div>";
		return formHtml;
	} else return trHtml;
}

function disruptor(dataobjeto) {
	descriptorDeTabla.mapeoCampos = "";

	if (dataobjeto == 'tbl_cierre') { // declaracion de funciones
		cargarInventarioInicial();
	}

	if (dataobjeto != 'tbl_funciones') { // declaracion de funciones
		var tbl_funciones = readInformationFromLocalStorage('tbl_funciones');
		tbl_funciones = JSON.parse(tbl_funciones);
		for (var i = 0; i < tbl_funciones.length; i++) {
			if (tbl_funciones[i].nombreTabla == dataobjeto) {
				var cuerpoFuncion = tbl_funciones[i].funcion;
				var nombreFuncion = tbl_funciones[i].nombreFuncion;
				var funcion = "function " + nombreFuncion + cuerpoFuncion;
				funcion = funcion.replace(/\[/g, '{');
				funcion = funcion.replace(/\]/g, '}');
				funcion = funcion.toString();
				eval(funcion); // crea la funcion local dentro del contexto de esta funcion.
			}
		}
	}
	var tablaActiva = dataobjeto;
	var tituloTabla = dataobjeto;
	tituloTabla = tituloTabla.split("tbl_");
	tituloTabla = tituloTabla[1];
	tituloTabla = tituloTabla.replace(/_/g, ' ');
	var objetoTabla = readInformationFromLocalStorage(dataobjeto);
	objetoTabla = JSON.parse(objetoTabla);
	var tablaHTML = "";
	var formHTML = "";
	var tipoRespuesta = 0;
	var encabezadoTabla = "";
	var rowBackground = "#ffffff";
	for (var i = 0; i < objetoTabla.length; i++) {
		if (objetoTabla[i].tipo > 0) {
			tipoRespuesta = objetoTabla[i].tipo; // Editable = 1, isReadOnly = 2;
			encabezadoTabla = "<tr style='background-color:" + rowBackground + "'>";
			encabezadoTabla = recordSet2Schema(objetoTabla[i], i, 0, 1, 0);
			if (tipoRespuesta != 2) {
				formHTML = recordSet2Schema(objetoTabla[i], i, 1, 0, 0);
			}
			encabezadoTabla += "</tr>";
		}
	}

	if( tipoRespuesta == 1 ){
		document.getElementById('contenidoForm').innerHTML = '<table>'+formHTML+'</table>';
		formHTML = '';
	}

	for (var i = 0; i < objetoTabla.length; i++) {
		if (objetoTabla[i].tipo == 0) {
			tablaHTML += "<tr style='background-color:" + rowBackground + "'>";
			tablaHTML += recordSet2Schema(objetoTabla[i], i, 0, 0, tipoRespuesta); // jsonObject, indx, isForm, isHead, isReadOnly, Editable.
			tablaHTML += "</tr>";
		}
		if (rowBackground == "#ffffff") rowBackground = "#aaaaaa";
		else rowBackground = "#ffffff";
	}

	var dformTemplate = document.getElementById('dformTemplatefv').innerHTML;
	dformTemplate = dformTemplate.replace(/@tabla@/g, dataobjeto);
	dformTemplate = dformTemplate.replace(/@reporte@/g, "<div class='dformclass'><table>" + encabezadoTabla+tablaHTML + "</table></div>");
	document.getElementById("contenidoReporte").innerHTML = dformTemplate;

	if (dataobjeto != 'tbl_funciones') { // declaracion de funciones
		for (var i = 0; i < tbl_funciones.length; i++) { // post-consumo de funciones
			if (tbl_funciones[i].nombreTabla == dataobjeto) {
				if (typeof (eval(tbl_funciones[i].nombreFuncion)) == "function") {
					for (var j = 0; j < objetoTabla.length; j++) {
						if (objetoTabla[j].tipo == 0) {
							var parametros = tbl_funciones[i].parametros;
							parametros = parametros.split(",");
							var mapeoCampos = descriptorDeTabla.mapeoCampos;
							mapeoCampos = mapeoCampos.split(":");
							var vardef = "var "; //string para definicion de variables
							var pardef = ""; // string para definicion de parametros
							var varPref = "l_"; // string para el prefijo de las variables locales
							var varList = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"; // variables locales
							var varList = varList.split(",");
							var valueIndex = 0;
							for (var k = 0; k < parametros.length; k++) {
								for (var l = 0; l < mapeoCampos.length; l++) {
									var pair = mapeoCampos[l];
									pair = pair.split(",");
									if (parametros[k] == pair[1]) {
										valueIndex = pair[0];
									}
								}
								var contentId = document.getElementById('value_' + j + '_' + valueIndex).innerHTML;
								if (isNaN(contentId)) {
									contentId = contentId.toLowerCase();
									vardef += varPref + varList[k] + "='" + contentId + "', ";
								} else {
									contentId = parseFloat(contentId);
									vardef += varPref + varList[k] + "=" + contentId + ", ";
								}
								pardef += varPref + varList[k] + ",";
							}
							vardef += " _z=0";
							pardef += "_z";
							eval(vardef);
							var fd_call = "var l_r = " + tbl_funciones[i].nombreFuncion + "(" + pardef + ");"; // local r para el resultado
							// console.log(vardef); console.log(pardef); console.log(fd_call);
							eval(fd_call);
							for (var l = 0; l < mapeoCampos.length; l++) {
								var pair = mapeoCampos[l];
								pair = pair.split(",");
								if (tbl_funciones[i].resultado == pair[1]) {
									valueIndex = pair[0];
								}
							}
							document.getElementById('value_' + j + '_' + valueIndex).innerHTML = l_r;
						}
					}
				}
			}
		}
	}
}

function restauraMenu(){
	document.getElementById('menuR').style.display = "none";
	document.getElementById('menuC').style.display = "block";
}

function ocultarMenu(){
	document.getElementById('menuC').style.display = "none";
	document.getElementById('menuR').style.display = "block";
	document.getElementById('tdMenuC').style.width = '0px';
}

function pedircatalogo(catalogo) {
	catalogoActual = catalogo;
	removeInformationInLocalStorage(catalogo);
	var consultar = url + "pedircatalogo?catalogo=" + catalogo;
	ajax_load(consultar);
	ocultarMenu();
}

function jump(h) {
	var top = document.getElementById(h).offsetTop;
	window.scrollTo(0, top);
}

function autorizaringreso() {
	var usuario = document.getElementById('usuario').value;
	var clave = document.getElementById('clave').value;
	if (usuario.length > 1 && clave.length > 1) {
		var consultar = url + "autorizaringreso?usuario=" + usuario + "&clave=" + clave;
		ajax_load(consultar);
	}
}

function depurador() {
	document.getElementById('depurador').innerHTML = "<pre>" + JSON.stringify(comandaActiva, null, 2) + "</pre>";
}

function serverIpChange() {
	ip = document.getElementById('serverIP').value;
	storeInformationInSessionStorage("serverIP", ip);
	url = "http://" + ip + ":8895/";
	// snd = new Audio("http://" + ip + ":8898/alerta.wav");
}

///////////////////////////////////////////////

	var tabLinks = new Array();
	var contentDivs = new Array();

	function initInner() {

	  // Grab the tab links and content divs from the page
	  var tabListItems = document.getElementById('tabsInner').childNodes;
	  for ( var i = 0; i < tabListItems.length; i++ ) {
		if ( tabListItems[i].nodeName == "LI" ) {
		  var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		  var id = getHash( tabLink.getAttribute('href') );
		  tabLinks[id] = tabLink;
		  contentDivs[id] = document.getElementById( id );
		}
	  }

	  // Assign onclick events to the tab links, and
	  // highlight the first tab
	  var i = 0;
	  for ( var id in tabLinks ) {
		tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function() { this.blur() };
		if ( i == 0 ) tabLinks[id].className = 'selected';
		i++;
	  }

	  // Hide all content divs except the first
	  var i = 0;
	  for ( var id in contentDivs ) {
		if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
		i++;
	  }
	}

	function init() {

	  // Grab the tab links and content divs from the page
	  var tabListItems = document.getElementById('tabs').childNodes;
	  for ( var i = 0; i < tabListItems.length; i++ ) {
		if ( tabListItems[i].nodeName == "LI" ) {
		  var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		  var id = getHash( tabLink.getAttribute('href') );
		  tabLinks[id] = tabLink;
		  contentDivs[id] = document.getElementById( id );
		}
	  }

	  // Assign onclick events to the tab links, and
	  // highlight the first tab
	  var i = 0;
	  for ( var id in tabLinks ) {
		tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function() { this.blur() };
		if ( i == 0 ) tabLinks[id].className = 'selected';
		i++;
	  }

	  // Hide all content divs except the first
	  var i = 0;
	  for ( var id in contentDivs ) {
		if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
		i++;
	  }
	}

	function showTab() {
	  var selectedId = getHash( this.getAttribute('href') );

	  // Highlight the selected tab, and dim all others.
	  // Also show the selected content div, and hide all others.
	  for ( var id in contentDivs ) {
		if ( id == selectedId ) {
		  tabLinks[id].className = 'selected';
		  contentDivs[id].className = 'tabContent';
		} else {
		  tabLinks[id].className = '';
		  contentDivs[id].className = 'tabContent hide';
		}
	  }

	  // Stop the browser following the link
	  return false;
	}

	function getFirstChildWithTagName( element, tagName ) {
	  for ( var i = 0; i < element.childNodes.length; i++ ) {
		if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
	  }
	}

	function getHash( url ) {
	  var hashPos = url.lastIndexOf ( '#' );
	  return url.substring( hashPos + 1 );
	}

///////////////////////////////////////////////

function inicio() {
	if (isInformationFromSessionStorage("ingreso")) {
		if (activePage == "index") {
			
			/***
			if (isInformationFromSessionStorage('serverIP')) {
				ip = readInformationFromSessionStorage("serverIP");
				url = "http://" + ip + ":8895/";
				// snd = new Audio("http://" + ip + ":8898/alerta.wav");
			}
			***/

			pedircatalogo("indexMenuMantenimiento");
			pedircatalogo("tbl_funciones");
			init();
			/*** setTimeout(function () { pedircatalogo("tbl_cierre"); }, 1000); ***/
			setTimeout(function () { cargando=0; }, 1500);
			var userStorage = readInformationFromSessionStorage("ingreso");
			usuarioActivo = JSON.parse(userStorage);
			usuarioActivo = usuarioActivo.data;
		}
	} else {
		if (activePage != "ingresar") {
			window.location.href = "index.html";
		}else{
			/***
			var thisIsRunningAt = location.href.substring(7, location.href.lastIndexOf(":"));
			if(document.getElementById('serverIP')){
				document.getElementById('serverIP').value = thisIsRunningAt;
			} 
			ip = thisIsRunningAt;
			url = "http://" + ip + ":8895/";
			***/
			// snd = new Audio("http://" + ip + ":8898/alerta.wav");
		}
	}
	
}

window.addEventListener("load", inicio);