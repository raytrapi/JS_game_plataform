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
        window.onkeydown=function(ev){t.tecladoPulsado(ev);};
        window.onkeyup=function(ev){t.tecladoLiberado(ev);};
        window.onmousedown=function(ev){t.ratonPulsado(ev);};
        window.onmouseup=function(ev){t.ratonLiberado(ev);};
        //win
    }
    insertarObjeto(objeto){
        this.objetos.push(objeto);
    }
    tiempoAnterior=0;
    //frameAnterior=0;
    //framesSegundo=0;
    deltaTime=0;
    procesarFrame(ev){
        let tiempoActual=0;
        if(this.conFrames && this.jugando && 1!=1){
            tiempoActual=ev;
            
        }else{
            let time=new Date();
            tiempoActual=time.getTime();
        }
        if(this.tiempoAnterior!=0){
            this.deltaTime=tiempoActual-this.tiempoAnterior;
        }else{
            this.deltaTime=1;
        }
        //console.log(this.tiempoAnterior,tiempoActual,tiempoActual-this.tiempoAnterior, this.deltaTime);
        this.tiempoAnterior=tiempoActual;
        //console.log(this.tiempoAnterior,tiempoActual,this.deltaTime);
        this.log(this.deltaTime,false);
        //this.framesSegundo=this.tiempoAnterior
        //    this.frameAnterior=tiempoActual;
        tablero.onUpdate();
        //console.log(ev);
        if(this.conFrames && this.jugando){
            this.conIdFrame=requestAnimationFrame(function(ev2){tablero.procesarFrame(ev2)})
        }
    }
    conFrames=false;
    conIdFrame=null;
    jugando=false;
    comenzar(){
        this.jugando=true;
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
        if(requestAnimationFrame){
            this.conFrames=true;
            this.conIdFrame=requestAnimationFrame(function(ev){tablero.procesarFrame(ev)});
            return true;/**/
        }
        this.conFrames=false;
            
        this.temporizador=setInterval(function(ev){tablero.procesarFrame()},1);
        return true;
    }
    finJuego(texto){
        this.finalizar();
        this.log(texto, false);
    }
    finalizar(){
        this.jugando=false;
        if(this.conIdFrame!=null){
            window.cancelAnimationFrame(this.conIdFrame);
        }else{
            clearInterval(this.temporizador);
        }
    }
    onUpdate(){
        //console.log("Actualizo tablero");
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onUpdate){
                objeto.onUpdate();
            }
        }
        this.onCollision();
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
    onCollision(){
        for(let objeto of this.objetos){
            if(objeto.collisionable){
                let col=this.siColision(objeto,this.objetos);
                if(col!=null){
                    if(objeto.onCollision){
                        objeto.onCollision(col);
                    }
                }
            }
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
    tecladoPulsado(ev){
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onKeyDown){
                objeto.onKeyDown(ev);
            }
        }
    };
    tecladoLiberado(ev){
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onKeyUp){
                objeto.onKeyUp(ev);
            }
        }
    };
    ratonPulsado(ev){
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onMouseDown){
                objeto.onMouseDown(ev);
            }
        }
    };
    ratonLiberado(ev){
        for(var i=0;i<this.objetos.length;i++){
            var objeto=this.objetos[i];
            if(objeto.onMouseUp){
                objeto.onMouseUp(ev);
            }
        }
    };
    onKeyPress(t,f){

    }
    siColision(o,oC){
        //this.log("compruebo colisiones con "+oC.length+" elementos");
        let areaObjeto={x1:o.localizacion.x,y1:o.localizacion.y,x2:o.localizacion.x+o.dimension.w,y2:o.localizacion.y+o.dimension.h};
        for(let objeto of oC){
            if(objeto!=o && objeto.collisionable){
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
    pintarImagen(x,y,img,w,h,opciones={}){
        let rot=null;
        let recorte=null;
        if(opciones){
            if (opciones["rot"]!=undefined){
                rot=opciones["rot"];
                this.lienzo.save();
                this.lienzo.translate(rot.x+x,rot.y+y);
                this.lienzo.rotate(rot.angulo);
            }
            if(opciones["recorte"]!=undefined){
                recorte=opciones["recorte"];
            }
        }
        if(rot){
            if(recorte){
                this.lienzo.drawImage(img,recorte.x,recorte.y,recorte.w,recorte.h,0-rot.x,0-rot.y,w,h);
            }else{
                this.lienzo.drawImage(img,0-rot.x,0-rot.y,w,h);
            }
        }else{
            if(recorte){
                this.lienzo.drawImage(img,recorte.x,recorte.y,recorte.w,recorte.h,x,y,w,h);
            }else{
                this.lienzo.drawImage(img,x,y,w,h);
            }
        }
        if(rot){
            this.lienzo.restore();
        }
    }
    cargarImagen(url){
        var img=JH5.c("img");
        //this.imgCargada=false;
        img.src=url;
        img.onload=function(){
        //    t.imgCargada=true;
            console.log("imagen cargada");
        }
        return img;
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

    destroy(o){
        var pos=this.objetos.indexOf(o);
        if(this.objetos.length>pos){
            this.objetos=this.objetos.slice(0,pos).concat(this.objetos.slice(pos+1));
        }else{
            this.objetos.pop();
        }
        o=null;
    }
}

class Entidad{
    constructor(){
        this.tablero=tablero;
    }
}

var tablero;
var invasores;
JH5.siListo(function(){
    tablero=new Tablero();
    //tablero.pintarRectangulo(10,10,100,100);
    JH5.cargarJS("js/videojuegos/invasores/invasores.js",function(tablero){
        invasores=new Invasores(tablero)
        invasores.inicializar();
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
    //tablero.comenzar();
    
});