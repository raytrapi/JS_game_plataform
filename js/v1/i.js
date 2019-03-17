


/**
 * Devuelve los objetos a buscar dentro de un contenedor
 * String c cadena de busqueda
 * String o objeto contenedor
 * return null | objeto | [objetos]
 */
function JH5(c, o){
	var t=JH5;
	o=o || t.d;
	switch(c[0]){
		case "#": 
			return t.d.getElementById(c.substr(1));
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
			if(i==undefined){
				JH5.log("cargando "+o+ " " +tiempo);
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
 * función || string f con la función a ejecutar
 */
JH5.e=function(f){
	if(typeof(f)=="function"){
		f.call();
	}else{
		eval(f);
	}
	
}

/**
 * Método para poner un objeto dentro o cerca de otro
 * object o que será el objeto a posicionar
 * object d que será el objeto de referencia
 * int m que será el modo de posicionamiento
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
/**
 * Método de carga de ficheros Javascript
 * string u es la URL de nuestro JS
 * function f será llamada cuando se produzca la carga de nuestro JS
 * return true | false
 */
JH5.cargarJS=function(u,f){
	var t=this, c=t.c("script");
	
	c.type="text/javascript";
	c.defer="defer";
	c.src=u;
	
	if(f){
		t.evento(c,"onload", function(){
			var c=this;
			/*c.onload=null;
			c.readystatechange=null;*/
			JH5.e(f);
		});
		t.evento(c,"onreadystatechange", function(){
			var c=this;
			if(c.readyState=="complete" || c.radyState=="loaded"){
				/*c.onload=null;
				c.readystatechange=null;*/
				JH5.e(f);
			}
		});

	}
	
	var h=t.head();
	if(h!=null){
		t.poner(c,h);
		return true;
	}else if(t.body()!=null){
		t.poner(c,t.body());
		return true;
	}
	
	return false;
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