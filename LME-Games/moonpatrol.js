
var canvas;
var ctx;

var tank = {'image' : new Image(),
            'frameIndice' : 0,
            'frameLista' :  [0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1],
            'x' : 300,
            'y': 270,
            'w' : 70,
            'h' : 70,
            'velX' : 0,
            'velY' : 0};

var inimigo = {'image' : new Image(),
            'frameIndice' : 0,
            'frameLista' :  [0],
            'x' : 800,
            'y': 30,
            'w' : 136,
            'h' : 136,
            'velX' : -3,
            'velY' : 1,
            'objX' : 800,
            'objY' : 30};


function keyDown( e ) {
    if (e.keyCode == 65) {
        tank['velX'] = -3;
    } else if(e.keyCode == 68) {
        tank['velX'] = 3;
    }
}

function keyUp( e ) {
    if (e.keyCode == 65) {
        tank['velX'] = 0;
    } else if(e.keyCode == 68) {
        tank['velX'] = 0;
    }
}

function mouseClick() {
    console.log(" Mouse clicado ");
    //ctx.drawImage(imagemTank, 0, 0, 80, 60, 360, 270, 320, 240);

    // ctx.drawImage( imagem, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}

function centroX( obj ) {
    return Math.ceil(obj['x'] + (obj['w'] / 2));
}

function centroY( obj ) {
    return Math.ceil(obj['y'] + (obj['h'] / 2));
}


function mouseMove( mouseInfo ) {
    var dx = mouseInfo.x - centroX(tank);
    var dy = mouseInfo.y - centroY(tank);
    var h = Math.sqrt( dx * dx + dy * dy);
    var seno = dy / h;
    var coseno = dx / h;
    var anguloRad = Math.asin( seno );
    var anguloGraus = anguloRad *  180 / Math.PI;
    if ( coseno > 0 ) {
        anguloGraus = Math.abs( anguloGraus );
    } else {
        anguloGraus = 90 + (90 - Math.abs( anguloGraus ));
    }
    tank['frameIndice'] = 9 - Math.ceil(anguloGraus / 20);
    //ctx.drawImage(imagemTank, 0, 0, 80, 60, 360, 270, 320, 240);

    // ctx.drawImage( imagem, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH);
}

function calcularRegras() {
    tank['x'] += tank['velX'];

    // Verifica se a posição atual do inimigo esta no objetivo
    // Caso positivo, escolhe novo objetivo para a nave
    if (inimigo['x'] == inimigo['objX']) {
        inimigo['velX'] = 0;
    }
    if (inimigo['y'] == inimigo['objY']) {
        inimigo['velY'] = 0;
    }
    if (inimigo['x'] == inimigo['objX'] && inimigo['y'] == inimigo['objY']) {
        console.log("Novo Objetivo criado");
        inimigo['objX'] = Math.ceil(Math.random() * 800);
        inimigo['objY'] = Math.ceil(Math.random() * 100);
        inimigo['velX'] = (inimigo['objX'] >  inimigo['x']) ? 1 : -1;
        inimigo['velY'] = (inimigo['objY'] >  inimigo['y']) ? 1 : -1;
        console.log("Novo Objetivo criado" + inimigo['objX'] + " - " + inimigo['objY']);
    }
    inimigo['x'] += inimigo['velX'];
    inimigo['y'] += inimigo['velY'];
}

function pintar() {
    var nIndiceFrame = tank['frameLista'][tank['frameIndice']];
    var srcX = 2 + (nIndiceFrame * tank['w']);
    var srcY = 125;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 800, 600);
    ctx.drawImage(tank['image'], srcX, srcY, tank['w'], tank['h'],
                    tank['x'], tank['y'], tank['w'], tank['h']);

    ctx.drawImage(inimigo['image'], 0, 0, inimigo['w'], inimigo['h'],
                    inimigo['x'], inimigo['y'], inimigo['w'], inimigo['h']);
}

function loopJogo() {

    calcularRegras();
    pintar();

}

function iniciar() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    tank['image'].src = "./assets/image/tank.png";
    inimigo['image'].src = "./assets/image/inimigo.png";
}

draw = function() {
    background(227, 254, 255);
    fill(130, 79, 43);
    rect(0, height*0.90, width, height*0.10);
    // ...
}
function teste(idDiv){
      var div = document.getElementById(idDiv);
      div.style.background = 'url(fundo.jpg)';
}
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mousedown", mouseClick);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("load", iniciar);

window.setInterval(loopJogo, 5);
