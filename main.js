var game = new Phaser.Game(500, 340, Phaser.AUTO, 'game')
var mainState = {
  preload: function(){
    //set player sprite
    game.load.image('player', 'assets/player.png');
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
  },
  update: function(){
    this.movePlayer();
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
  }
};
game.state.add('main', mainState);
game.state.start('main');
