var soloSprite, soloImagem;
var backSprite, backImagem;
var trexSprite, trexCorrendo, trexColidido;
var nuvemImagem, nuvemSprite;
var shadeSprite,shadeFly,shadeStop;

var o1, o2, o3, o4, o5, o6;

var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;

var grupoCactos, grupoNuvens;
//cria-se as variáveis para os sons
var somFim;
var somPulo;
var somCheckPoint;

var pontos = 0;

function preload() {
    soloImagem = loadImage("solo.jpg");
    backImagem = loadImage("Forest B.png");
    gameOverImg = loadImage("game over.png");

    trexCorrendo = loadAnimation("2.png","3.png","4.png","5.png","6.png","7.png","8.png");
    trexColidido = loadAnimation("Knight C.png")

    shadeFly = loadAnimation("Shade 1.png","Shade 2.png","Shade 3.png","Shade 4.png");
    shadeStop = loadAnimation("Shade 1.png");

    nuvemImagem = loadImage("crow.png");

    o1 = loadImage("pedra 1.png");
    o2 = loadImage("pedra 2.png");
    o3 = loadImage("pedra 3.png");
    o4 = loadImage("pedra 4.png");
    o5 = loadImage("pedra 3.png");
    o6 = loadImage("pedra 1.png");

    

    //esse código carrega o som
    somFim = loadSound("fim.mp3");

    somPulo = loadSound("pulo.mp3");

    somCheckPoint = loadSound("checkPoint.mp3");
    
}







function setup() {
    createCanvas(600, 200);
    
    backSprite = createSprite(300,100);
    backSprite.addImage(backImagem);

    soloSprite = createSprite(300, 190, 300, 40);
    soloSprite.addImage(soloImagem);
    soloSprite.velocityX = -3;

    trexSprite = createSprite(80,190,50,50);
    //esse comando adiciona a animação na sprite
    trexSprite.addAnimation("correndo",trexCorrendo);
    trexSprite.addAnimation("parado", trexColidido);

    trexSprite.scale = 0.4;

    shadeSprite  = createSprite(30,130,50,50);
    shadeSprite.addAnimation("fly",shadeFly);
    shadeSprite.addAnimation("stop",shadeStop);
    shadeSprite.scale = 0.4;
    //define o colisor
    trexSprite.setCollider("circle",0, 0, 50);

    grupoCactos = new Group();
    grupoNuvens = new Group();

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.7;
    
}


var aleatorio = 0;
pontos = 0;
function draw() {
    background("white");

    fill('black');
    textSize(20);
    text(pontos, 500, 50);

    if(estadoJogo === JOGAR){

        pontos = Math.round(frameCount/3);

        soloSprite.velocityX = -(3 + pontos/100);
        
        if(pontos % 100 == 0){
           somCheckPoint.play();
        }

         //verIFica se o solo saiu da tela
        if(soloSprite.x < 0 ){
            //caso a condição seja cumprida, o solo volta ao meio
            soloSprite.x = 300;
        }

        //verIFica se a pessoa aperte espaço
        if(keyDown("space")){
            //caso a condição seja cumprida, o trex pula
            trexSprite.velocityY = -10;
            somPulo.play()
        }

        //cria as sprites de cactos e nuvens
        gerarCactos();
        criarNuvens();
        
        gameOver.visible = false;

        //verIFica se o trex tocou em algum cacto
        if(trexSprite.isTouching(grupoCactos)){
            //muda o estado de jogo para FIM
            //esse código toca o som
            somFim.play()
            estadoJogo = FIM;
        }
    }
    //verIFica se o estado de jogo é fim
    if(estadoJogo === FIM){
        //condição acima for cumprida, lê os comandos a seguir
         console.log("FIM DE JOGO");
         soloSprite.velocityX = 0;
         //esse comando paralisa os membros do grupo de nuvens e o grupo de cactos
         grupoNuvens.setVelocityXEach(0);
         grupoCactos.setVelocityXEach(0);
         //dá tempo de vida infinito
         grupoNuvens.setLifetimeEach(-1);
         grupoCactos.setLifetimeEach(-1);
         
         trexSprite.changeAnimation("parado")
         shadeSprite.changeAnimation("stop")

         gameOver.visible = true;
         
    }
   
    //dá gravidade para o trex
    trexSprite.velocityY += 0.8;

    //manda o trex colidir com o solo
    trexSprite.collide(soloSprite);


    drawSprites();
}

function criarNuvens(){
    if(frameCount % 90 == 0){
        aleatorio = Math.round(random(0,100));
        nuvemSprite = createSprite(600,aleatorio);
        nuvemSprite.addImage(nuvemImagem);
        nuvemSprite.velocityX = -3;
        nuvemSprite.scale = 0.3;
        trexSprite.depth = nuvemSprite.depth + 1;
        nuvemSprite.lifetime = 250;
        grupoNuvens.add(nuvemSprite)

    };
}
var a = 0;
function gerarCactos(){
    if(frameCount % 60 == 0){
        a = Math.round(random(1,6));
        cactoSprite = createSprite(600, 170);
        cactoSprite.velocityX = soloSprite.velocityX;
        cactoSprite.scale = 0.5;
        
        switch (a) {
            case 1:
                cactoSprite.addImage(o1);
                break;
            case 2:
                cactoSprite.addImage(o2);      
            case 3:
                cactoSprite.addImage(o3);                      
            case 4:
                cactoSprite.addImage(o4);
                break;
            case 5:
                cactoSprite.addImage(o5);      
            case 6:
                cactoSprite.addImage(o6);                    
            default:
                break;
        }
        
        cactoSprite.lifetime = 250;
        grupoCactos.add(cactoSprite)
    }   
}