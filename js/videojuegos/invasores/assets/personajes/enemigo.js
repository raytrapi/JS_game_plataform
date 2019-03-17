/**
 * Enemigo Genérico
 */
invasores.Enemigo=function(tipo, x, y){
	this.version= 1;
	this.tipo= tipo||1;
	this.localizacion={
		x: x || 0,
		y: y || 0
	};
	this.dimension= {
		w: 50,
		h: 20
	};
	this.velocidad=5;
	this.vida= 2;
	this.puntuacion={
		impacto: 1,
		destruccion: 5
	};
	this.o=JH5.c("div", null, "enemigo-"+this.tipo, JH5("#videojuego"));
	this.pintar=invasores.Enemigo.pintar;
	this.update=invasores.Enemigo.update;
}


var e=invasores.Enemigo;
e.update=function(){
	this.localizacion.x+=this.velocidad;
}
e.pintar=function(){
	//JH5.log("pinto Enemigo de tipo "+this.tipo);
	
	this.o.style.top=this.localizacion.y+"px";
	this.o.style.left=this.localizacion.x+"px";
}