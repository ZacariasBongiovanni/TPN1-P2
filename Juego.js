// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Juego extends Phaser.Scene {
  
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("juego");
  }

  init() {
    this.nivel = 1
    this.score = 0
   
   
  }

  preload() {
    

    this.load.image("barra", "./assets/images/barra.png");
    this.load.image("obs", "./assets/images/obs.png");
    this.load.image("pelota", "./assets/images/pelota.png");
  
   
  }

  create() {
    this.barra = this.physics.add.sprite (400, 500, "barra").setImmovable();
    this.barra.body.allowGravity = false;

    this.barra.setCollideWorldBounds(true);

    this.pelota = this.physics.add.sprite (400, 100, "pelota");
    this.pelota.setBounce(1);
    this.pelota.setScale(0.1);
    this.pelota.setCircle(210, 50, 40);
    this.VelocidadPelota = 200;
    this.pelota.setVelocity(this.VelocidadPelota,this.VelocidadPelota);
    this.pelota.body.allowGravity = false;


    this.pelota.setCollideWorldBounds(true);



    this.physics.add.collider(
      this.barra,
      this.pelota,
      this.puntos,
      null,
      this
  )

  this.obstaculo = this.physics.add.staticGroup ();


  this.physics.add.collider(
    this.pelota,
    this.obstaculo
  );
 
  this.scoreText = this.add.text (340, 16, "Rebotes: " + this.score, { 
    fontSize: '20px', 
    fill: '#fff' ,
    stroke: "#FF0000",
      strokeThickness: 4,
  });
 
  this.nivelText = this.add.text (350, 40, "Nivel: " + this.nivel, { 
    fontSize: '20px',
    fill: '#fff' ,
    stroke: "#FF0000",
    strokeThickness: 4,
  });


  this.cursors = this.input.keyboard.createCursorKeys();

  const randomColor = Phaser.Display.Color.RandomRGB();
      this.cameras.main.setBackgroundColor(randomColor);

  }

  puntos(){
    this.score = this.score + 1;
    this.scoreText.setText("Rebotes: " + this.score);

    if (this.score >= 10) {
      this.nuevonivel ();
    }
    
  }

  nuevonivel(){

    this.nivel++;
    this.nivelText.setText("Nivel " + this.nivel);


    this.barra.setPosition(400, 500)
    this.pelota.setPosition(400, 100)
    this.VelocidadPelota = this.VelocidadPelota * 1.1;
    this.pelota.setVelocity(this.VelocidadPelota, this.VelocidadPelota)


    this.score = 0;
    this.scoreText.setText("Rebotes: " + this.score);


    let randomObstaculox = Phaser.Math.Between(100, 690);
    let randomObstaculoy = Phaser.Math.Between(100, 300);
    let randomObstaculoScale = Phaser.Math.Between(1, 2);

    

    this.obstaculo.create(randomObstaculox, randomObstaculoy, "obs").setScale(randomObstaculoScale).refreshBody();

    const randomColor = Phaser.Display.Color.RandomRGB();
      this.cameras.main.setBackgroundColor(randomColor);


      if (this.nivel >= 21) {
        this.ganar();
    }


  }

  ganar(){
    this.add.text(400, 300, "¡JUEGO COMPLETADO!", {
      fontSize: '48px',
      fill: '#FF0000',
      align: 'center'
  }).setOrigin(0.5);
  this.pelota.disableBody(true, true);
  this.barra.disableBody(true, true);
 
  }



  update() {
  
    if (this.cursors.left.isDown) {
      this.barra.setVelocityX(-250);
    }
  
    else if (this.cursors.right.isDown) {
      this.barra.setVelocityX(250);
    }

    else {
      this.barra.setVelocity(0);
    }
    
  }
 
  
}
