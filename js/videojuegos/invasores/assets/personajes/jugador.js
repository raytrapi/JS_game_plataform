JH5.siExiste("EntidadGrafica",function(){
   globalThis.Tanque= class extends EntidadGrafica{
      constructor(x,y,padre){
         super();
         this.localizacion.x=x-50;
         this.localizacion.y=y-50;
         this.dimension.w=64;
         this.dimension.h=64;
         this.tipo="JUGADOR";
         this.vida=this.VIDAMAXIMA;
         this.padre=padre;
         this.collisionable=true;
         this.imagen=tablero.cargarImagen("recursos/jugador.png");
         JH5.cargarJS("js/videojuegos/invasores/assets/armas/misil.js");
      }
      velocidad=0.5;
      VIDAMAXIMA=20;
      vida=20;
      teclas={
         KeyA:{pulsada:false},
         KeyD:{pulsada:false},
         KeyW:{pulsada:false},
         KeyS:{pulsada:false},
      }
      botones={
         1:{pulsado:false},
         2:{pulsado:false},
         3:{pulsado:false},
      }
      onUpdate(){
         if(this.teclas["KeyA"].pulsada){
            this.localizacion.x-=(this.velocidad*tablero.deltaTime);
         }
         if(this.teclas["KeyD"].pulsada){
            this.localizacion.x+=(this.velocidad*tablero.deltaTime);
         }
         if(this.botones[1].pulsado){
            this.disparar();
         }
         if(this.ultimoDisparo!=0){
            this.ultimoDisparo+=(1*tablero.deltaTime);
            if(this.ultimoDisparo>=this.cadenciaDisparo){
               this.ultimoDisparo=0;
            }
         }
      }
      ANCHOIMAGEN=64;
      ALTOIMAGEN=64;
      fotograma=0;
      fotogramaAnterior=0;
      sentidoFotograma=1;
      FOTOGRAMAS=3;
      TIEMPOFOTOGRAMA=200;
      onPaint(){
         tablero.pintarImagen(this.localizacion.x,this.localizacion.y,this.imagen,this.dimension.w,this.dimension.h,{recorte:{x:this.fotograma*this.ANCHOIMAGEN,y:0,w:this.ANCHOIMAGEN,h:this.ALTOIMAGEN}});
         tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y-2-5,(this.dimension.w*(this.vida/this.VIDAMAXIMA)),5,{estilo:"#00ff00",relleno:true});
      }
      cadenciaDisparo=500;
      ultimoDisparo=0;
      disparar(){
         if(this.ultimoDisparo==0){
            //JH5.siListo("Misil",function(){
               let misil=new Misil(this.localizacion.x,this.localizacion.y-this.dimension.h,this);
               //this.municion.push(rayo);
               this.padre.entorno.push(misil);
               tablero.insertarObjeto(misil);
               this.ultimoDisparo=1;
            //});
            
         }
         
      }
      impacto(daño){
         this.vida-=daño;
         let explosion=new Audio("recursos/impacto.mp3");
         explosion.play();
         if(this.vida<0){
            this.padre.terminar(-1);
         }
   
      }
      destruir(){
         let explosion=new Audio("recursos/destruccion.mp3");
         explosion.play();
      }
      onKeyDown(ev){
         if(this.teclas[ev.code]!=undefined){
            this.teclas[ev.code].pulsada=true;
         }
      }
      onKeyUp(ev){
         if(this.teclas[ev.code]!=undefined){
            this.teclas[ev.code].pulsada=false;
         }
      }
      onMouseDown(ev){
         this.botones[1].pulsado=ev.buttons&1;
      }
      onMouseUp(ev){
         this.botones[1].pulsado=ev.buttons&1;
      }
   }
   
});


