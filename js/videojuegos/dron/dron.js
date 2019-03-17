class Dron extends Entidad{
    constructor(x,y,fichero,w,h){
        super();
        var t=this;
        x=x||0;
        y=y||0;
        fichero=fichero||"recursos/drone.svg";
        t.x=x;
        t.y=y;
        t.w=w||50;
        t.h=h||50;
        t.w_2=t.w/2;
        t.h_2=t.h/2;
        t.z=0;
        t.zCompensacion=Math.PI/2;

        var img=JH5.c("img");
        t.imgCargada=false;
        img.src=fichero;
        img.onload=function(){
            t.imgCargada=true;
        }
        
        t.img=img;
        t.coordenadaActual=-1;
        t.coordenadaAlcanzada=false;
        t.coordenadaLocalizada={
            mirando:false,
            zCalculado:false, 
            zAngulo:0,
            radian:t.tablero.radian
        };
        t.coordenadas=[];
    }
    onPaint(){
        var t=this;
        for (let i = 0; i < t.coordenadas.length; i++) {
            const coordenada = t.coordenadas[i];
            if(i==t.coordenadaActual){
                t.tablero.pintarCirculo(coordenada.x,coordenada.y, 10,{estilo:"red", fill:true});
            }else{
                t.tablero.pintarCirculo(coordenada.x,coordenada.y, 10,{estilo:"black",fill:false});
            }
        }
        if(t.imgCargada){
            t.tablero.pintarImagen(t.x,t.y,t.img,t.w,t.h,{angulo:t.z,x:t.w_2,y:t.h_2});
        }
        
    }
    onUpdate(){
        var t=this;
        var l=t.coordenadaLocalizada;
        //this.z+=this.tablero.radian;
        
        if(!t.coordenadaAlcanzada 
            && t.coordenadas.length>0
            && t.coordenadaActual<t.coordenadas.length){
            if(!l.mirando){
                if(t.coordenadaActual==-1){
                    if(t.coordenadas.length>0){
                        t.coordenadaActual=0;
                    }
                }
                if(!l.zCalculado){
                    l.zAngulo=t.calcularPuntoMira();
                    l.zCalculado=true;
                    if(l.zAngulo<t.z){
                        l.radian=-1*t.tablero.radian;
                    }else{
                        l.radian=t.tablero.radian;
                    }
                }
                this.z+=l.radian;
                t.tablero.log("calculo giro "+ l.zAngulo,false);
                t.tablero.log("Estoy en "+ this.z);
                if(Math.abs(this.z-l.zAngulo)<0.01){
                    l.mirando=true;
                }
            }else{
                t.coordenadaAlcanzada=true;
            }
        }else{
            t.coordenadaActual++;
            t.tablero.log("Estoy en "+ t.coordenadaActual,false);
            if(t.coordenadaActual<t.coordenadas.length){
                
            }else{
                t.coordenadaActual=0;
            }
            t.coordenadaAlcanzada=false;
                l.mirando=false;
                l.zCalculado=false;
        }
    }
    calcularPuntoMira(){
        var t=this;
        var cO=t.coordenadas[t.coordenadaActual].y-(t.y+t.h_2);
        var cA=t.coordenadas[t.coordenadaActual].x-(t.x+t.w_2);
        var angulo=Math.atan2(cO,cA);
        t.tablero.log("calculo giro "+ angulo);

        return angulo+t.zCompensacion;
    }
    insertarCoordenada(x,y){
        this.coordenadas.push({x:x,y:y});
    }
}