class Rayo extends EntidadGrafica{
   constructor(x,y, padre){
      super();
      this.tipo="RAYO";
      this.localizacion.x=x;
      this.localizacion.y=y;
      this.dimension.w=5;
      this.dimension.h=10;
      this.padre=padre;
   }
   padre=null;
   velocidad=3;
   duracion=500;
   onPaint(){
      if(this.duracion>0){
         tablero.pintarRectangulo(this.localizacion.x,this.localizacion.y,this.dimension.w,this.dimension.h,{estilo:"#0000ff",relleno:true});
      }
   }
   onUpdate(){
      if(this.duracion>0){
         this.localizacion.y+=1*this.velocidad;
         this.duracion--;
         let objetoColision=this.padre.tablero.siColision(this,this.padre.entorno);
         if(objetoColision!=null){
            this.padre.colisionEnemigo(this, objetoColision);
         }
      }
      
   }

}