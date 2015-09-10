Load = function(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
  },
  
  create: function() {
    this.game.state.start('menu');
  }
}