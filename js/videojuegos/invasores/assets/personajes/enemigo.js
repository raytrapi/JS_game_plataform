/**
 * Enemigo Genérico
 */
JH5.siExiste("EntidadGrafica",function(){
	globalThis.Enemigo =class extends EntidadGrafica{
		padrepadre=null;
		localizacion={};
		dimension={};
		velocidad=0.1;
		velocidadMaxima=1;
		VIDAMAXIMA=3;
		
		sentido=1;
		collisionable=true;
		puntuacion={
			impacto: 1,
			destruccion: 5
		};
		tipo=1;
		constructor(x, y, padre){
			super();
			this.tipo= "ENEMIGO";
			this.localizacion={
				x: x || 0,
				y: y || 0
			};
			this.dimension= {
				w: 64,
				h: 64
			};
			this.imagen=tablero.cargarImagen("recursos/enemigo1.png");
			this.padre=padre;
			//this.o=JH5.c("div", null, "enemigo-"+this.tipo, JH5("#espacio"));
			//this.onPaint=invasores.Enemigo.onPaint;
			//this.onUpdate=invasores.Enemigo.onUpdate;
			this.vida=this.VIDAMAXIMA;
			JH5.cargarJS("js/videojuegos/invasores/assets/armas/rayo.js",function(){console.log("Cargado")});
		}
		daño=3;
		ANCHOIMAGEN=64;
		ALTOIMAGEN=64;
		onUpdate(){
			if(this.destruido){
				return;
			}
			var t=this, p=t.padre;
			t.localizacion.x+=((this.sentido*t.velocidad)*tablero.deltaTime);
			
			if(Math.random()<(0.002)){
				this.disparar();
			}
		}
		disparar(){
			let t=this;
			JH5.siExiste("Rayo",function(){
				let rayo=new Rayo(t.localizacion.x,t.localizacion.y+t.dimension.h+2,t.padre);
				//t.municion.push(rayo);
				//t.entorno.push(rayo);
				tablero.insertarObjeto(rayo);
			})
			
		}
		acercarse(cuanto){
			var t=this, p=t.padre;
			t.localizacion.y+=cuanto;
			if(t.localizacion.y>tablero.height){
				t.localizacion.y=10;
				t.localizacion.x=10;
			}
		}
		fotograma=0;
		fotogramaAnterior=0;
		sentidoFotograma=1;
		FOTOGRAMAS=3;
		TIEMPOFOTOGRAMA=200;

		onPaint(){
			if(this.destruido){
				return;
			}
			//JH5.log("pinto Enemigo de tipo "+this.tipo);
			//this.padre.tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y,this.dimension.w,this.dimension.h,{estilo:"#ff0000",relleno:true});
			//console.log(this.imagen);
			tablero.pintarImagen(this.localizacion.x,this.localizacion.y,
										this.imagen,this.dimension.w,this.dimension.h,
										{recorte:{x:this.fotograma*this.ANCHOIMAGEN,y:(this.VIDAMAXIMA-this.vida)*this.ALTOIMAGEN,w:this.ANCHOIMAGEN,h:this.ALTOIMAGEN}});
			this.fotogramaAnterior+=(1*tablero.deltaTime);
			if(this.fotogramaAnterior>this.TIEMPOFOTOGRAMA){
				this.fotogramaAnterior=0;
				this.fotograma+=this.sentidoFotograma;
				if(this.fotograma==this.FOTOGRAMAS){
					this.sentidoFotograma=-1;
					this.fotograma+=this.sentidoFotograma;
					this.fotograma+=this.sentidoFotograma;
				}else if(this.fotograma==-1){
					this.sentidoFotograma=1;
					this.fotograma+=this.sentidoFotograma;
					this.fotograma+=this.sentidoFotograma;
				}
			}
		}
		destruido=false;
		destruir(){
			tablero.destroy(this);
			this.destruido=true;
		}
		impacto(daño){
			console.log("DAÑO", daño);
			this.vida-=daño;
			console.log("VIDA",this.vida);
			if(this.vida<=0){
				this.destruir();
			}
		}
		onCollision(conQuien){
			switch(conQuien.tipo){
				case "PARED":
					this.acercarse(10);
					if(this.velocidad<this.velocidadMaxima){
						if(this.sentido==-1){
							this.velocidad+=0.1;
						}
					}
					this.sentido*=-1;
					break;
				case "JUGADOR":
					if(conQuien.impacto){
						conQuien.impacto(this.daño);
					}
					this.impacto(1);
					break;
			}
		}
		
	}
});



