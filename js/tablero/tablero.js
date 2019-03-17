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

        t.canvas=c;
        t.lienzo=c.getContext("2d");

        t.objetos=[];

        t.miLog=[];
        t.radian=Math.PI/180;

        
        window.onmousemove=function(ev){t.ratonMoviendose(ev);};
    }
    insertarObjeto(objeto){
        this.objetos.push(objeto);
    }
    comenzar(){
        this.temporizador=setInterval(function(){tablero.onUpdate();},1);
        return true;
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
    limpiar(){
        var t=this;
        t.lienzo.clearRect(0,0,t.canvas.width,t.canvas.height);
    }
    pintarCirculo(x, y ,r, opciones){
        //console.log("pinto circulo");
        var l=this.lienzo;
        if(opciones && opciones.estilo){
            if(opciones && opciones.fill){
                l.fillStyle =opciones.estilo;
            }else{
                l.strokeStyle =opciones.estilo;
            }
        }
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
    JH5.cargarJS("js/videojuegos/dron/dron.js",function(){
        var dron=new Dron(200,200,"recursos/dron.svg",100,100);
        tablero.insertarObjeto(dron);
        /*dron.insertarCoordenada(100,100);
        dron.insertarCoordenada(200,400);
        dron.insertarCoordenada(150,60);
        dron.insertarCoordenada(100,110);
        dron.insertarCoordenada(200,80);
        dron.insertarCoordenada(60,600);/**/
    });
    tablero.comenzar();
    
});