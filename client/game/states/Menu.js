Menu = function(game) {
  this.game = game;
}

Menu.prototype = {
  create: function() {
    this.title = this.game.add.text(this.game.world.width /2, this.game.world.height / 2, 'The Menu!', {font: "30px Frijole", fill: "#FFFFFF"});
    this.title.anchor.setTo(0.5, 0.5);
  }
}