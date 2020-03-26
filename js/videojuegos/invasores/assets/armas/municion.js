class Municion extends EntidadGrafica{
   constructor(x,y,padre,fichero){
      super();
      this.tipo="MUNICION";
      this.localizacion.x=x;
      this.localizacion.y=y;
      this.dimension.w=32;
      this.dimension.h=32;
      this.padre=padre;
      this.audio=new Audio(fichero);
      this.audio.play();
         
   }
}