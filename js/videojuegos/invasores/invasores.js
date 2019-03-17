
/**
 * Objeto de videojuego Space Invaders
 */
var invasores={
	version:1,
	enemigosLinea:10,
	enemigos:[]
}

/**
 * Método pinta un objeto en pantalla
 * 
 * @param string c que contiene la clase de objeto a pintar
 * @param int x 
 * @param int y 
 */
invasores.pintar=function(){
	
	var t=this;
	for(var i=0; i<t.enemigos.length; i++){
		t.enemigos[i].pintar();
	}
} 

invasores.update=function(){
	var t=this;
	for(var i=0; i<t.enemigos.length; i++){
		t.enemigos[i].update();
		t.enemigos[i].pintar();
	}
}

/**
 * @namespace invasores
 */
invasores.inicializar=function(){
	JH5.cargarJS("js/videojuegos/invasores/assets/personajes/enemigo.js", function(){
		var inv=invasores;
		for(var i=0; i<inv.enemigosLinea; i++){
			var e=new invasores.Enemigo(1,i*(50+25), 0);
			inv.enemigos.push(e);
			e.pintar();
		}
		
		var b=JH5.c("button",null,null,JH5.body());
		b.innerHTML="Comenzar";
		JH5.evento(b,"onclick", function(){
			this.style.display="none";
			comenzar();
		})
		
	});
	
}