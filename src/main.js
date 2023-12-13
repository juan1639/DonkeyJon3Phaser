// ================================================================
//  D O N K E Y - J O N  3
// 
// ----------------------------------------------------------------
const config = {

    type: Phaser.AUTO,
    width: 800,
    height: 550,
    tileX: 64,
    tileY: 64,

    jugador: {
        xIni: 360,
        yIni: 0
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const dimensiones = {
    columnas: Math.floor(config.width / config.tileX),
    filas: Math.floor(config.height / config.tileY)
};

let jugador;
let plataforma;

// ================================================================
function preload() {
    
    this.load.image('cielo', './assets/fondo_cielo101.png');
    this.load.image('plataforma', './assets/tile1.png');
    // this.load.image('star', './assets/star.png');
    // this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('jugador', './assets/player_vector.svg', {frameWidth: 80, frameHeight: 110});
}

// ================================================================
function create() {

    this.add.image(config.width / 2, config.height / 2, 'cielo');

    plataforma = this.physics.add.staticGroup();
    crea_plataformas();

    crea_jugador(this);

    controles = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(jugador, plataforma);
}

// ================================================================
function update() {

    leer_teclado();
}

// ================================================================
function crea_jugador(esto) {

    jugador = esto.physics.add.sprite(config.jugador.xIni, config.jugador.yIni, 'jugador');
    jugador.setCollideWorldBounds(true);
    jugador.setBounce(0.2);
    jugador.body.setGravityY(300);

    esto.anims.create({
        key: 'left',
        frames: esto.anims.generateFrameNumbers('jugador', {start: 9, end: 10}),
        frameRate: 10,
        repeat: -1
    });

    esto.anims.create({
        key: 'right',
        frames: esto.anims.generateFrameNumbers('jugador', {start: 9, end: 10}),
        frameRate: 10,
        repeat: -1
    });

    esto.anims.create({
        key: 'turn',
        frames: [{key: 'jugador', frame: 0}],
        frameRate: 20,
    });
}

// ----------------------------------------------------------------
function crea_plataformas() {

    const sueloSize = dimensiones.columnas + 1;

    const array_plataformas = [
        [608, 150, 6, 0.7],
        [128, 270, 4, 0.7],
        [400, 530, sueloSize, 0.7]
    ];

    for (let plataf of array_plataformas) {
        const x = plataf[0];
        const y = plataf[1];
        const ancho = plataf[2];
        const alto = plataf[3];

        plataforma.create(x, y, 'plataforma').setScale(ancho, alto).refreshBody();
    }
}

// ================================================================
function leer_teclado() {
    
    if (controles.left.isDown) {
        jugador.setVelocityX(-160);
        jugador.anims.play('left', true);
        
    } else if (controles.right.isDown) {
        jugador.setVelocityX(160);
        jugador.anims.play('right', true);
        
    } else {
        jugador.setVelocityX(0);
        jugador.anims.play('turn');
    }
    
    if (controles.up.isDown && jugador.body.touching.down) {
        jugador.setVelocityY(-500);
    }
}

// ================================================================
const game = new Phaser.Game(config);
