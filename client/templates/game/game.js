var game;

Template.game.onRendered(function() {
    // console.log(this);
    // Session.set('gameStarted', this.data.started);
});

Template.game.onDestroyed(function() {
    game.destroy(true);
    game = null;
    $('canvas').remove();
});

Template.game.helpers({
    owned: function() {
        if (this.owner === Meteor.userId()) {
            return true;
        }
    },
    
    isMe: function() {
        if (this.id === Meteor.userId()) {
            return true;
        }
    },
    
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
    
    gameStarted: function() {
        return Session.get('gameStarted');
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
    },
    
    'click .game-start-button': function(e) {
        e.preventDefault();
        
        Session.set('gameStarted', true);
        
        Meteor.call('updateGame', this._id, {started: Session.get('gameStarted')});
    }
});