var game = new Phaser.Game(500, 340, Phaser.AUTO, 'game')
var mainState = {
  preload: function(){
    //set player sprite
    game.load.image('player', 'assets/player.png');
    //load walls
    game.load.image('wallV', 'assets/wallVertical.png');
    game.load.image('wallH', 'assets/wallHorizontal.png');
  },
  create: function(){
    //Set background
    game.stage.backgroundColor = '#3498db';
    //Set physics engine to ARCADE
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Setup player sprite
    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    //set physics for player
    game.physics.arcade.enable(this.player);
    //add gravity for player
    this.player.body.gravity.y = 500;
    this.cursor = game.input.keyboard.createCursorKeys();
    this.createWorld();
  },
  update: function(){
    game.physics.arcade.collide(this.player, this.walls);
    this.movePlayer();
    if (!this.player.inWorld){
      this.playerDie();
    }
  },
  movePlayer: function(){
    //left arrow
    if(this.cursor.left.isDown){
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown){
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }
    if (this.cursor.up.isDown && this.player.body.touching.down){
      //make player jump
      this.player.body.velocity.y = -320;
    }
  },
  createWorld: function(){
    //set walls
    //create group of vertical walls
    this.walls = game.add.group();
    //set physics for wall group
    this.walls.enableBody = true;
    //vertical walls
    game.add.sprite(0, 0, 'wallV', 0, this.walls); //left wall
    game.add.sprite(480, 0, 'wallV', 0, this.walls); //right wall
    //horizontal walls
    game.add.sprite(0, 0, 'wallH', 0, this.walls); //top left
    game.add.sprite(300, 0, 'wallH', 0, this.walls); //top right
    game.add.sprite(0, 320, 'wallH', 0, this.walls); //bottom left
    game.add.sprite(300, 320, 'wallH', 0, this.walls); //bottom right
    game.add.sprite(-100, 150, 'wallH', 0, this.walls);
    game.add.sprite(400, 150, 'wallH', 0, this.walls);
    var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
    middleBottom.scale.setTo(1.5, 1);
    //set all walls to immovable
    this.walls.setAll('body.immovable', true);
  },
  playerDie: function(){
    game.state.start('main');
  }
};
game.state.add('main', mainState);
game.state.start('main');
