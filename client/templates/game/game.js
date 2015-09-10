var game;

Template.game.onRendered(function() {
});

Template.game.onDestroyed(function() {
    game.destroy();
    game = null;
});

Template.game.helpers({
    game: function() {
        
        game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
        
        game.global = {};
        
        game.state.add('boot', new Boot(game));
        game.state.add('load', new Load(game));
        game.state.add('menu', new Menu(game));
        game.state.add('game', new Game(game));
        game.state.add('win', new Win(game));
        game.state.add('lose', new Lose(game));
        game.state.start('boot');
    },
    
    owned: function() {
        if (this.id === Meteor.userId()) {
            return true;
        }
    }
});

Template.game.events({
    'click .leave-game-button': function(e) {
        e.preventDefault();
        
        Meteor.call('removePlayerFromGame', this.id, Template.currentData()._id, function(error, result) {
            if (error) {
                throwError(error.reason);
            }
        });
    }
});