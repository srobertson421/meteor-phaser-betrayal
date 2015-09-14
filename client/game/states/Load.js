Load = function(game) {
  this.game = game;
}

Load.prototype = {
  preload: function() {
    this.game.load.image('cover', '/img/cover.png');
    this.game.load.atlasJSONHash('golem', '/img/golem.png', '/img/golem.json');
  },
  
  create: function() {
    this.game.state.start('menu');
  }
}