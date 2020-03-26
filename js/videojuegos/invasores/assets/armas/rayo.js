JH5.cargarJS("js/videojuegos/invasores/assets/armas/municion.js",function(){
   globalThis.Rayo= class  extends Municion{
      padre=null;
      velocidad=0.4;
      sentido=1;
      daño=1;
      duracion=500;
      audio=null;
      destruido=false;
      constructor(x,y, padre){
         super(x,y,padre,"recursos/Laser_Gun.mp3");
         this.imagen=tablero.cargarImagen("recursos/municion.png");
         this.collisionable=true;
      }
      tiempoDestruccion=200;
      fotograma=0;
      fotogramaAnterior=0;
      sentidoFotograma=1;
      FOTOGRAMAS=3;
      TIEMPOFOTOGRAMA=200;
      ANCHOIMAGEN=64;
      ALTOIMAGEN=64;
      onPaint(){
         if(this.duracion>0 && !this.destruido){
            tablero.pintarImagen(this.localizacion.x,this.localizacion.y,
                                 this.imagen,this.dimension.w,this.dimension.h,
                                 {recorte:{x:this.fotograma*this.ANCHOIMAGEN,y:0,w:this.ANCHOIMAGEN,h:this.ALTOIMAGEN}});
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
            //tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y,this.dimension.w,this.dimension.h,{estilo:"#aaaaff",relleno:true});
         }else{
            tablero.pintarImagen(this.localizacion.x,this.localizacion.y,
               this.imagen,this.dimension.w,this.dimension.h,
               {recorte:{x:3*this.ANCHOIMAGEN,y:0,w:this.ANCHOIMAGEN,h:this.ALTOIMAGEN}});
         }
      }
      onUpdate(){
         if(this.duracion>0 && !this.destruido){
            this.localizacion.y+=this.sentido*(this.velocidad*tablero.deltaTime);
            this.duracion--;
         }else{
            if(this.tiempoDestruccion<=0){
               tablero.destroy(this);
            }else{
               this.tiempoDestruccion-=tablero.deltaTime;
               
            }
   
         }
         
      }
      impacto(daño){
         this.daño-=daño;
         if(this.daño<=0){
            this.destruir();   
         }
      }
      onCollision(conQuien){
         //this.padre.colisionEnemigo(this, objetoColision);
         switch(conQuien.tipo){
            case "MUNICION":
            case "JUGADOR":
               this.destruir();
               if(conQuien.impacto){
                  conQuien.impacto(this.daño--);
               }
   
               break;
            case "ENEMIGO":
               break;
            default:
               this.destruir();
         }
      }
      destruir(){
         this.collisionable=false;
         this.destruido=true;
      }
   
   }
})
