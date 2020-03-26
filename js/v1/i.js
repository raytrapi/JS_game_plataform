


/**
 * Devuelve los objetos a buscar dentro de un contenedor
 * @param String c cadena de busqueda
 * @param String o objeto contenedor
 * @return null | objeto | [objetos]
 */
function JH5(c, o){
	var t=JH5;
	o=o || t.d;
	//TODO: Controlar si o no es un array
	switch(c[0]){
		case "#": 
			return o.getElementById(c.substr(1));
			break;
		case ".":
			return o.getElementsByClassName(c.substr(1));
			break;
		default:
			return o.getElementsByTagName(c);
			break;
	}
}
JH5.w=window;
JH5.d=window.document;
JH5.b=null;
JH5.h=null;

JH5.siExiste=function(o,f,parametros, tiempo){
	tiempo=tiempo||0;
	if(tiempo<1000){
		tiempo+=100;
	}else if(tiempo<10000){
		tiempo+=1000;
	}
	let existe=false;
	eval("existe=typeof("+o+")!=\"undefined\";");
	if(!existe){
		setTimeout(function(){
			JH5.siExiste(o,f,parametros, tiempo);
		}, tiempo);
	}else{
		//console.log("Ya existe",o);
		JH5.e(f,null,parametros);
	}
}
/**
 * Llama a la función indicada cuando el objeto existe
 * @param function f función a llamar cuando el objeto esté creado
 * @param object | String o Objeto por el que se espera
 * @param number tiempo tiempo hasta la proxima comprobación
 */
JH5.siListo=function(f,o, tiempo){
	var t=this;
	var b=t.body();
	/*b.onload=function(){
		JH5.alerta("body cargado");
		f.call();
	}*/
	if(o==null){
		t.w.onload=function(){
			f.call();
		}
	}else{
		if(typeof(o)=="string"){
			var i=JH5.w[o];
			tiempo=tiempo||0;
			if(tiempo<1000){
				tiempo+=100;
			}else if(tiempo<10000){
				tiempo+=1000;
			}
			if(i=="undefined"){
				//JH5.log("cargando "+o+ " " +tiempo);
				setTimeout(function(){
					JH5.siListo(f,o, tiempo);
				}, tiempo);
			}else{
				JH5.e(f);
			}
		}
	}
}

/**
 * Método para la creación de objetos HTML
 * @param string t con el tag a crear
 * @param string id
 * @param string c clase
 * @param object oC Objeto donde se incluirá nuestro nuevo elemento
 * @return HTMLElement
 */
JH5.c=function(t, id, c, oC){
	var o;
	o=JH5.d.createElement(t);
	if(id){
		o.id=id;
	}
	if(c){
		o.className=c;
	}
	if(oC){
		JH5.poner(o,oC);
	}
	
	  
	return o;
}

/**
 * Método para ejecutar funciones
 * @param function | string f con la función a ejecutar
 * @param object o objeto que invoca la función
 * @param array p parametros necesarios para llamar a la función
 */
JH5.e=function(f,o,p){
	if(typeof(f)=="function"){
		return f.call(o, p);
	}else{
		eval(f);
	}
	
}

/**
 * Método para poner un objeto dentro o cerca de otro
 * @param object o que será el objeto a posicionar
 * @param object d que será el objeto de referencia
 * @param int m que será el modo de posicionamiento
 */
JH5.poner=function(o,d,m){
	switch (m){
		default:
			d.appendChild(o);
	}
}


JH5.eventos=[];
/**
 * Método controla un evento dentro de nuestro objeto
 * object o el objeto a controlar
 * string e con el evento a controlar
 * function || string f con la función a ejecutar
 * 
 * retorna el número de funcion
 */
JH5.evento=function(o,e,f){
	o[e]=f;
	
	return 0;
}
JH5.javaScripts={};
JH5.javaScriptsFuncionesPendientes=[];
JH5.comprobarCargajavaScripts=function(){
	//let borrar=[];
	for(let j=0;j<JH5.javaScriptsFuncionesPendientes.length;j++){
		
		let paquete=JH5.javaScriptsFuncionesPendientes[j];
		if(paquete.pendiente){
			let cargado=true;
			for(let i=0;i<paquete.scripts.length && cargado;i++){
				//console.log(paquete.scripts[i],JH5.javaScripts);
				cargado=JH5.javaScripts[paquete.scripts[i]].cargado;
			}
			if(cargado){
				paquete.pendiente=false;
				if(paquete.f){
					paquete.f.call(paquete.o,paquete.parametros);
				}
			}
		}
	}
	
}
/**
 * Método de carga de ficheros Javascript
 * @param string | array u es la URL de nuestro JS
 * @param function f será llamada cuando se produzca la carga de nuestro JS
 * @return true | false
 */
JH5.cargarJS=function(u,f,o,parametros){
	if(!Array.isArray(u)){
		u=[u];
	}
	let conError=false;
	let correcto=true;
	JH5.javaScriptsFuncionesPendientes.push({scripts:u,f:f,o:o,parametros:parametros,pendiente:true});
	for(let url of u){
		if(this.javaScripts[url]==undefined){
			this.javaScripts[url]={cargado:false};
			var t=this, c=t.c("script");
			
			c.type="text/javascript";
			c.defer="defer";
			c.src=url;
			
			if(f){
				t.evento(c,"onload", function(){
					var c=this;
					/*c.onload=null;
					c.readystatechange=null;*/
					JH5.javaScripts[url].cargado=true;
					//JH5.e(f,o,parametros);
					JH5.comprobarCargajavaScripts();
				});
				t.evento(c,"onreadystatechange", function(){
					var c=this;
					if(c.readyState=="complete" || c.radyState=="loaded"){
						/*c.onload=null;
						c.readystatechange=null;*/
						JH5.javaScripts[url].cargado=true;
						//JH5.e(f,o,parametros);
						JH5.comprobarCargajavaScripts();
					}
				});

			}
			
			var h=t.head();
			if(h!=null){
				t.poner(c,h);
				correcto=correcto && true;
			}else if(t.body()!=null){
				t.poner(c,t.body());
				correcto=correcto && true;
			}
			
			correcto=false;
		}

	}
	return correcto;
	
}

JH5.head=function(){
	var t=this;
	if(t.h==null){

		t.h=t.d.head;
	}
	return t.h;
}
JH5.body=function(){
	var t=this;
	if(t.b==null){

		t.b=t.d.body;
	}
	return t.b;
}

JH5.alerta=function(o){
	console.log(o);
}
JH5.log=function(o){
	console.log(o);
}