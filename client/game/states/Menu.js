Menu = function(game) {
  this.game = game;
}

Menu.prototype = {
  create: function() {
    
    this.menuBg = this.game.add.sprite(0, 0, 'cover');
    
    this.menuText = 'Click to Play!'
    this.game.input.onDown.addOnce(this.start, this);
    
    this.title = this.game.add.text(this.game.world.width /2, this.game.world.height / 2, this.menuText, {font: "30px Frijole", fill: "#dddd00", align: 'center'});
    this.title.anchor.setTo(0.5, 0.5);
  },
  
  start: function() {
    this.game.state.start('game');
  }
}