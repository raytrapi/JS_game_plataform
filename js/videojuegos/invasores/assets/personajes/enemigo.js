/**
 * Enemigo Genérico
 */
class Enemigo extends EntidadGrafica{
	padre=null;
	localizacion={};
	dimension={};
	velocidad=1;
	vida=2;
	puntuacion={
		impacto: 1,
		destruccion: 5
	};
	tipo=1;
	constructor(tipo, x, y){
		super();
		this.tipo= tipo||"ENEMIGO";
		this.localizacion={
			x: x || 0,
			y: y || 0
		};
		this.dimension= {
			w: 50,
			h: 20
		};
		//this.o=JH5.c("div", null, "enemigo-"+this.tipo, JH5("#espacio"));
		//this.onPaint=invasores.Enemigo.onPaint;
		//this.onUpdate=invasores.Enemigo.onUpdate;
	}
	onUpdate(){
		var t=this, p=t.padre;
		t.localizacion.x+=(p.direccionEnemigos*t.velocidad);
		let objetoColision=p.tablero.siColision(t,p.entorno);
		if(objetoColision!=null){
			p.colisionEnemigo(this, objetoColision);
		}
		if(Math.random()<(0.002*this.velocidad)){
			p.lanzarDisparo(t.localizacion.x,t.localizacion.y+t.dimension.h+2);
		}
	}
	acercarse(cuanto){
		var t=this, p=t.padre;
		t.localizacion.y+=cuanto+t.dimension.h;
	}
	onPaint(){
		//JH5.log("pinto Enemigo de tipo "+this.tipo);
		this.padre.tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y,this.dimension.w,this.dimension.h,{estilo:"#ff0000",relleno:true});
	}
	
}




