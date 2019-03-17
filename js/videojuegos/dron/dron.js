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
        t.coordenada={x:t.x,y:t.y};
        
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
        t.tablero.limpiarLog();
        //this.z+=this.tablero.radian;
        
        if(!t.coordenadaAlcanzada){
            if(!l.mirando){
                if(!l.zCalculado){
                    l.zAngulo=t.calcularPuntoMira();
                    l.zCalculado=true;
                    if(l.zAngulo<t.z){
                        l.radian=-1*t.tablero.radian;
                    }else{
                        l.radian=t.tablero.radian;
                    }
                    l.x=t.coordenadas[t.coordenadaActual].x-t.w_2;
                    l.y=t.coordenadas[t.coordenadaActual].y-t.h_2;
                    l.calculadoMovimiento=false;
                }
                this.z+=l.radian;
                t.tablero.log("Cálculo giro "+ l.zAngulo);
                t.tablero.log("Estoy en "+ this.z);
                if(Math.abs(this.z-l.zAngulo)<0.01){
                    l.mirando=true;
                }
            }else{
                /*t.tablero.log("Estoy en ["+ t.x+","+t.y+"]");
                t.tablero.log("Voy a ["+ l.x+","+l.y+"]");
                if(Math.abs(l.x-t.x)<5 && Math.abs(l.y-t.y)<5){
                    t.coordenadaAlcanzada=true;
                }else{
                    if(!l.calculadoMovimiento){
                        l.avance=t.calcularMovimiento(t.x,t.y,l.x,l.y);
                        l.calculadoMovimiento=true;
                    }else{
                        t.tablero.log("Incremento distancias a ["+ l.avance.dx+","+l.avance.dy+"]");
                        t.x+=l.avance.dx;
                        t.y+=l.avance.dy;
                    }
                }/**/
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
    onMouseMove(ev){
        var t=this;
        var l=t.coordenadaLocalizada;
        t.coordenadaAlcanzada=false;
        l.mirando=false;
        l.zCalculado=false;
        t.coordenada={x:ev.clientX,y:ev.clientY};
        
    }
    onUpdate2(){
        var t=this;
        var l=t.coordenadaLocalizada;
        t.tablero.limpiarLog();
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
                    l.x=t.coordenadas[t.coordenadaActual].x-t.w_2;
                    l.y=t.coordenadas[t.coordenadaActual].y-t.h_2;
                    l.calculadoMovimiento=false;
                }
                this.z+=l.radian;
                t.tablero.log("Cálculo giro "+ l.zAngulo);
                t.tablero.log("Estoy en "+ this.z);
                if(Math.abs(this.z-l.zAngulo)<0.01){
                    l.mirando=true;
                }
            }else{
                t.tablero.log("Estoy en ["+ t.x+","+t.y+"]");
                t.tablero.log("Voy a ["+ l.x+","+l.y+"]");
                if(Math.abs(l.x-t.x)<5 && Math.abs(l.y-t.y)<5){
                    t.coordenadaAlcanzada=true;
                }else{
                    if(!l.calculadoMovimiento){
                        l.avance=t.calcularMovimiento(t.x,t.y,l.x,l.y);
                        l.calculadoMovimiento=true;
                    }else{
                        t.tablero.log("Incremento distancias a ["+ l.avance.dx+","+l.avance.dy+"]");
                        t.x+=l.avance.dx;
                        t.y+=l.avance.dy;
                    }
                }
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
    calcularMovimiento(xi,yi,xf,yf){
        var dx=xf-xi;
        var dy=yf-yi;
        var distancia=Math.sqrt(dx*dx+dy*dy);
        return {dx:dx/distancia,dy:dy/distancia};
    }
    calcularPuntoMira(){
        var t=this;
        var cO=t.coordenada.y-(t.y+t.h_2);
        var cA=t.coordenada.x-(t.x+t.w_2);
        var angulo=Math.atan2(cO,cA);
        t.tablero.log("calculo giro "+ angulo);

        return angulo+t.zCompensacion;
    }
    calcularPuntoMira2(){
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