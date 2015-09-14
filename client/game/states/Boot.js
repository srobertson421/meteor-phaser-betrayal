Boot = function(game) {
  this.game = game;
}

Boot.prototype = {
  create: function() {
    
    this.stage.disableVisibilityChange = true;
    
    //Scaling
    this.game.input.maxPointers = 1;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.maxWidth = 960;
    this.scale.maxHeight = 640;
    
    this.game.state.start('load');
  }
}