class Tablero{
    constructor(){
        var c=JH5.c("canvas","espacio","",JH5.body());
        var t=this;
        window.onresize=function(){
            c.width=window.innerWidth;
            c.height=window.innerHeight;    
        }
        c.width=window.innerWidth-10;
        c.height=window.innerHeight-10;
        t.width=c.width;
        t.height=c.height;
        t.canvas=c;
        t.lienzo=c.getContext("2d");

        t.objetos=[];

        t.miLog=[];
        t.radian=Math.PI/180;

        
        window.onmousemove=function(ev){t.ratonMoviendose(ev);};
        //win
    }
    insertarObjeto(objeto){
        this.objetos.push(objeto);
    }
    comenzar(){
        this.temporizador=setInterval(function(){tablero.onUpdate();},1);
        return true;
    }
    finJuego(texto){
        this.finalizar();
        this.log(texto);
    }
    finalizar(){
        clearInterval(this.temporizador);
    }
    onUpdate(){
        //console.log("Actualizo tablero");
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onUpdate){
                objeto.onUpdate();
            }
        }
        this.onPaint();
    }
    onPaint(){
        //console.log("Pinto tablero");
        this.limpiar();
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onPaint){
                objeto.onPaint();
            }
        }
        for (let i = 0; i < this.miLog.length; i++) {
            const log = this.miLog[i];
            this.pintarTexto(10,400+(15*i), log,10);
        }
    }
    ratonMoviendose(ev){
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onMouseMove){
                objeto.onMouseMove(ev);
            }
        }
    }
    onKeyPress(t,f){

    }
    siColision(o,oC){
        this.log("compruebo colisiones con "+oC.length+" elementos", false);
        let areaObjeto={x1:o.localizacion.x,y1:o.localizacion.y,x2:o.localizacion.x+o.dimension.w,y2:o.localizacion.y+o.dimension.h};
        for(let objeto of oC){
            let areaPrueba={x1:objeto.localizacion.x,y1:objeto.localizacion.y,x2:objeto.localizacion.x+objeto.dimension.w,y2:objeto.localizacion.y+objeto.dimension.h};
            let posibleColision=false;
            if(areaObjeto.x1>areaPrueba.x1 && areaObjeto.x1<areaPrueba.x2){
                posibleColision=true;
            }else if(areaObjeto.x2>areaPrueba.x1 && areaObjeto.x2<areaPrueba.x2){
                posibleColision=true;
            }else if(areaObjeto.x1<areaPrueba.x1 && areaObjeto.x2>areaPrueba.x2){
                posibleColision=true;
            } 
            if(posibleColision){
                if(areaObjeto.y1>areaPrueba.y1 && areaObjeto.y1<areaPrueba.y2){
                    return objeto;
                }
                if(areaObjeto.y2>areaPrueba.y1 && areaObjeto.y2<areaPrueba.y2){
                    return objeto;
                }
                if(areaObjeto.y1<areaPrueba.y1 && areaObjeto.y2>areaPrueba.y2){
                    return objeto;
                }
            }
        }
        return null;
    }
    limpiar(){
        var t=this;
        t.lienzo.clearRect(0,0,t.canvas.width,t.canvas.height);
    }
    pintarOpciones(opciones,l){
        
        if(opciones && opciones.estilo){
            if((opciones.fill || opciones.relleno)){
                l.fillStyle =opciones.estilo;
            }else{
                l.strokeStyle =opciones.estilo;
            }
        }
    }
    pintarRectangulo(x,y,an,al,opciones){
        var l=this.lienzo;
        this.pintarOpciones(opciones,l);
        //console.log("pinto rectangulo ",x,y,an,al);
        
        l.fillRect(x, y, an, al);
    }
    pintarCirculo(x, y ,r, opciones){
        //console.log("pinto circulo");
        var l=this.lienzo;
        this.pintarOpciones(opciones,l);
        l.beginPath();
        l.arc(x, y, r, 0, Math.PI*2);
        if(opciones && opciones.fill){
            l.fill();
        }else{
            l.stroke();
        }
    }
    pintarImagen(x,y,img,w,h,rot){
        if(rot){
            this.lienzo.save();
            this.lienzo.translate(rot.x+x,rot.y+y);
            this.lienzo.rotate(rot.angulo);
            this.lienzo.drawImage(img,0-rot.x,0-rot.y,w,h);
            this.lienzo.restore();
        }else{
            this.lienzo.drawImage(img,x,y,w,h);
        }
    }
    pintarTexto(x,y,texto, tamanyo){
        var l=this.lienzo;
        l.font = tamanyo+'px serif';
        l.fillText(texto, x, y);
    }
    limpiarLog(){
        this.miLog=[];
    }
    log(texto, acumular){
        acumular=acumular==undefined?true:false;
        if(acumular){
            this.miLog.push(texto);
        }else{
            this.miLog=[texto];
        }
    }
}

class Entidad{
    constructor(){
        this.tablero=tablero;
    }
}

var tablero;

JH5.siListo(function(){
    tablero=new Tablero();
    //tablero.pintarRectangulo(10,10,100,100);
    JH5.cargarJS("js/videojuegos/invasores/invasores.js",function(tablero){
        invasores.inicializar(tablero);
    },this,tablero);
    /*JH5.cargarJS("js/videojuegos/dron/dron.js",function(){
        var dron=new Dron(200,200,"recursos/dron.svg",100,100);
        tablero.insertarObjeto(dron);
        /*dron.insertarCoordenada(100,100);
        dron.insertarCoordenada(200,400);
        dron.insertarCoordenada(150,60);
        dron.insertarCoordenada(100,110);
        dron.insertarCoordenada(200,80);
        dron.insertarCoordenada(60,600);
    });/**/
    tablero.comenzar();
    
});