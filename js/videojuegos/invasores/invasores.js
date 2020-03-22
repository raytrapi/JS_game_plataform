
/**
 * Objeto de videojuego Space Invaders
 */
var invasores={
	version:1,
	enemigosLinea:10,
	enemigos:[],
	entorno:[],
	municion:[],
	tablero:null,
	direccionEnemigos:1
}

/**
 * Método pinta un objeto en pantalla
 * 
 * @param string c que contiene la clase de objeto a pintar
 * @param int x 
 * @param int y 
 */
invasores.onPaint=function(){
	
	var t=this;
	for(var i=0; i<t.enemigos.length; i++){
		t.enemigos[i].onPaint();
	}
} 

invasores.onUpdate=function(){
	var t=this;
	for(var i=0; i<t.enemigos.length; i++){
		t.enemigos[i].onUpdate();
		t.enemigos[i].onPaint();
	}
	for(let bala of this.municion){
		if(bala.duracion<=0){
			//Quitar
		}
	}
}
invasores.colisionEnemigo=function(quien, conQue){
	switch(conQue.tipo){
		case "JUGADOR":
			this.tablero.finJuego("El Enemigo Gana");
			break;
		case "PARED":
			if(this.direccionEnemigos==1){
				this.direccionEnemigos=-1;
			}else{
				this.direccionEnemigos=1;
			}
			for(let enemigo of this.enemigos){
				console.log(enemigo);
				enemigo.acercarse(1);
				enemigo.velocidad+=1;
			}
			break;
	}
	
}
invasores.lanzarDisparo=function(x,y, tipo){
	let rayo=new Rayo(x,y,this);
	this.municion.push(rayo);
	this.entorno.push(rayo);
	this.tablero.insertarObjeto(rayo);
}
/**
 * @namespace invasores
 */
invasores.inicializar=function(tablero){
	JH5.cargarJS("js/videojuegos/invasores/assets/objeto.js",function(tablero){
		JH5.cargarJS("js/videojuegos/invasores/assets/armas/rayo.js");
		JH5.cargarJS("js/videojuegos/invasores/assets/personajes/enemigo.js", function(tablero){
			var inv=invasores;
			inv.tablero=tablero;
			//console.log(tablero);	
			inv.entorno.push({localizacion:{x:0,y:0},dimension:{w:1,h:inv.tablero.height},tipo:"PARED"});
			inv.entorno.push({localizacion:{x:inv.tablero.width,y:0},dimension:{w:1,h:inv.tablero.height},tipo:"PARED"});
			let jugador={
				localizacion:{x:inv.tablero.width/2,y:inv.tablero.height-100},
				dimension:{w:100,h:50},
				tipo:"JUGADOR",
				onPaint:function(){
					tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y,this.dimension.w,this.dimension.h,{estilo:"#00ff00",relleno:true});
				}
			}
			tablero.insertarObjeto(jugador);
			inv.entorno.push(jugador);
			for(var i=0; i<inv.enemigosLinea; i++){
				var e=new Enemigo(1,i*(50+25), 0);
				e.padre=inv;
				
				inv.enemigos.push(e);
				//console.log(inv.tablero);	
				inv.tablero.insertarObjeto(e);
			}

			
			/*var b=JH5.c("button",null,null,JH5.body());
			b.innerHTML="Comenzar";
			JH5.evento(b,"onclick", function(){
				this.style.display="none";
				invasores.tablero.comenzar();
			})/**/
			
		},this, tablero);
	},this, tablero);
	
}
