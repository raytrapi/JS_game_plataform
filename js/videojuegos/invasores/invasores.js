
/**
 * Objeto de videojuego Space Invaders
 */
class Invasores{
	enemigosLinea=10;
	enemigos=[];
	entorno=[];
	municion=[];
	tablero=null;
	direccionEnemigos=1;
	constructor(tablero){
		this.tablero=tablero;
	}

	/**
	 * Método pinta un objeto en pantalla
	 * 
	 * @param string c que contiene la clase de objeto a pintar
	 * @param int x 
	 * @param int y 
	 */
	onPaint(){
		
		var t=this;
		for(var i=0; i<t.enemigos.length; i++){
			t.enemigos[i].onPaint();
		}
	} 

	onUpdate(){
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
	colisionEnemigo(quien, conQue){
		switch(conQue.tipo){
			case "JUGADOR":
				if(this.jugador.estasMuerto(1)){
					this.tablero.finJuego("El Enemigo Gana");
					this.volumenMusica(0.4);
					this.jugador.destruir();
					setTimeout(function(){
						invasores.cargarMusica("recursos/Into_the_Depths_Sting.mp3");
					},1000);
				}
				break;
			case "PARED":
				if(quien.tipo=="ENEMIGO"){
					if(quien.sentido==1){
						quien.sentido=-1;
					}else{
						quien.sentido=1;
					}
					quien.acercarse(1);
					quien.velocidad+=0.1;
					if(quien.velocidad>quien.velocidadMaxima){
						quien.velocidad=quien.velocidadMaxima
					}
				}
				break;
		}
		
	}
	lanzarDisparo(x,y, tipo){
		let rayo=new Rayo(x,y,this);
		this.municion.push(rayo);
		this.entorno.push(rayo);
		this.tablero.insertarObjeto(rayo);
	}
	musicaFondo=null;
	cargarMusica(fichero){
		if(this.musicaFondo!=null){
			this.musicaFondo.pause();
			delete this.musicaFondo;
		}
		this.musicaFondo=new Audio(fichero);
		this.musicaFondo.play();
	}
	detenerMusica(){
		if(this.musicaFondo!=null){
			this.musicaFondo.pause();
		}
	}
	volumenMusica(volumen){
		if(this.musicaFondo!=null){
			if(volumen<0){
				volumen=0;
			}else if(volumen>1){
				volumen=1;
			}
			this.musicaFondo.volume=volumen;
		}
	}
	terminar(estado){
		switch(estado){
			case -1:
				this.tablero.finJuego("El Enemigo Gana");
				this.volumenMusica(0.4);
				this.jugador.destruir();
				setTimeout(function(){
					invasores.cargarMusica("recursos/Into_the_Depths_Sting.mp3");
				},1000);
				break;
		}
	}
	jugador=null;
	/**
	 * @namespace invasores
	 */
	inicializar(){
		JH5.cargarJS("js/videojuegos/invasores/assets/entidadGrafica.js",function(tablero){
			JH5.cargarJS("js/videojuegos/invasores/assets/armas/rayo.js");
			JH5.cargarJS("js/videojuegos/invasores/assets/armas/misil.js");
			JH5.cargarJS("js/videojuegos/invasores/assets/personajes/jugador.js",function(){
				invasores.jugador=new Tanque(invasores.tablero.width/2,invasores.tablero.height-10,invasores);
				tablero.insertarObjeto(invasores.jugador);
				//invasores.entorno.push(invasores.jugador);
			});
			JH5.cargarJS("js/videojuegos/invasores/assets/personajes/enemigo.js", function(tablero){
				var inv=invasores;
				
				//console.log(tablero);	
				tablero.insertarObjeto({localizacion:{x:0,y:0},dimension:{w:1,h:inv.tablero.height},tipo:"PARED",collisionable:true});
				tablero.insertarObjeto({localizacion:{x:inv.tablero.width,y:0},dimension:{w:1,h:inv.tablero.height},tipo:"PARED",collisionable:true});
				tablero.insertarObjeto({localizacion:{x:0,y:-70},dimension:{w:inv.tablero.width,h:10},tipo:"PARED",collisionable:true});
				tablero.insertarObjeto({localizacion:{x:0,y:inv.tablero.height},dimension:{w:inv.tablero.width,h:10},tipo:"PARED",collisionable:true});
				
				for(let j=0; j<4; j++){
					for(let i=0; i<inv.enemigosLinea; i++){
						let e=new Enemigo(i*(32+24)+10, 10+(j*80), this);
						//inv.enemigos.push(e);
						//console.log(inv.tablero);	
						inv.tablero.insertarObjeto(e);
					}
				}
				
				
				var b=JH5.c("button",null,null,JH5.body());
				b.innerHTML="Comenzar";
				JH5.evento(b,"onclick", function(){
					this.style.display="none";

					invasores.tablero.comenzar();
					invasores.cargarMusica("recursos/Castlevania.mp3");
					invasores.volumenMusica(0.8);
				})/**/
				
			},this, tablero);
		},this, tablero);
	}
}