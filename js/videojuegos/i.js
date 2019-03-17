
JH5.siListo(function(){
	JH5.cargarJS("js/videojuegos/invasores/invasores.js", function(){
		invasores.inicializar();
	});
});

function comenzar(){
	setInterval(function(){
		invasores.update();
	}, 10);

}