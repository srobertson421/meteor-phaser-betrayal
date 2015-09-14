Game = function(game) {
  this.game = game;
  this.players = {};
  this.currentPlayerId = Meteor.userId();
}

Game.prototype = {
  
  create: function() {
    this.createPlayers();
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  
  createPlayers: function() {
    for (var i = 0; i < this.game.global.playerCount; i++) {
      
      this.players[this.game.global.players[i]] = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'golem');
      var player = this.players[this.game.global.players[i]];
      player.anchor.setTo(0.5, 0.5);
      this.game.physics.arcade.enable(player);
      player.body.collideWorldBounds = true;
      var anim = player.animations.add('idle', ['idle_1', 'idle_2', 'idle_3', 'idle_4', 'idle_5', 'idle_6'], 8, true, false);
      anim.play();
      
    }
  },
  
  update: function() {
    
    if (this.cursors.left.isDown) {
      this.startPlayerMovement('left', Meteor.userId());
      
      gameStream.emit('gameEvent', {
        eventType: 'move',
        state: this.game.state.current,
        sender: Meteor.userId(),
        nextState: null,
        velocity: -100,
        direction: 'left'
      });
      
    } else if (this.cursors.right.isDown) {
      this.startPlayerMovement('right', Meteor.userId());
      
      gameStream.emit('gameEvent', {
        eventType: 'move',
        state: this.game.state.current,
        sender: Meteor.userId(),
        nextState: null,
        velocity: 100,
        direction: 'right'
      });
    } else {
      this.stopPlayerMovement(null, Meteor.userId());
      
      gameStream.emit('gameEvent', {
        eventType: 'stopMove',
        state: this.game.state.current,
        sender: Meteor.userId(),
        nextState: null,
        velocity: 100,
        direction: null,
        playerX: this.players[Meteor.userId()].x,
        playerY: this.players[Meteor.userId()].y
      });
    }
  },
  
  startPlayerMovement: function(direction, playerId) {
    var player = this.players[playerId];
    if (direction === 'left') {
      player.scale.x = 1;
      player.body.velocity.x = -100;
    } else if (direction === 'right') {
      player.scale.x = -1;
      player.body.velocity.x = 100;
    }
  },
  
  stopPlayerMovement: function(direction, playerId, playerX, playerY) {
    var player = this.players[playerId];
    player.body.velocity.x = 0;
    
    if(this.players[playerId].x != playerX && playerX) {
      this.players[playerId].x = playerX;
    }
    
    if(this.players[playerId].y != playerY && playerY) {
      this.players[playerId].y = playerY;
    }
  }
}