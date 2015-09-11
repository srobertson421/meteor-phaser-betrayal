Load = function(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
    this.game.load.image('cover', '/img/cover.png');
  },
  
  create: function() {
    this.game.state.start('menu');
  }
}