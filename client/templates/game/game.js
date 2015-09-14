// --------------- Game Stream Methods ----------------------
// Data changes
gameStream = new Meteor.Stream('gameStream');

gameStream.on('gameData', function(data) {
  Session.set('gameStarted', data.started);
  Session.set('gameEnded', data.ended);
  Session.set('gameTurn', data.turn);
  
  if(data.ended) {
      destroyGame();
  }
  
});

// Game Events
gameStream.on('gameEvent', function(event) {
     
     if (event.eventType === 'click' && event.state === 'menu') {
        game.state.states[event.state].start();
     }
     
     if (event.eventType === 'move' && event.state === 'game') {
         game.state.states[event.state].startPlayerMovement(event.direction, event.sender)
     }
     
     if (event.eventType === 'stopMove') {
        game.state.states[event.state].stopPlayerMovement(event.direction, event.sender);
     }
});

// --------------- End of Game Stream Methods ----------------------

var game;

Template.game.onCreated(function() {
    $('canvas').remove();
});

Template.game.onRendered(function() {
    // console.log(this);
    // Session.set('gameStarted', this.data.started);
});

Template.game.onDestroyed(function() {
    destroyGame();
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
        
        game.global = {
            playerCount: this.players.length,
            players: []
        };
        
        for (var i = 0; i < game.global.playerCount; i++) {
            game.global.players.push(this.players[i].id);
        }
        
        game.state.add('boot', new Boot(game));
        game.state.add('load', new Load(game));
        game.state.add('menu', new Menu(game));
        game.state.add('game', new Game(game));
        game.state.add('win', new Win(game));
        game.state.add('lose', new Lose(game));
        game.state.start('boot');
    },
    
    gameStarted: function() {
        return Games.findOne({_id: this._id}).started;
    },
    
    gameEnded: function() {
        return Games.findOne({_id: this._id}).ended;
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
        
        var gameData = {
            started: true,
            ended: false,
            gameId: this._id,
            senderId: Meteor.userId(),
            senderName: this.ownerName
        }
        
        gameStream.emit('gameData', gameData);
    },
    
    'click .game-end-button': function(e) {
        e.preventDefault();
        
        Session.set('gameEnded', true);
        
        Meteor.call('updateGame', this._id, {ended: Session.get('gameEnded')});
        
        var gameData = {
            started: true,
            ended: true,
            gameId: this._id,
            senderId: Meteor.userId(),
            senderName: this.ownerName
        }
        
        gameStream.emit('gameData', gameData);
        
        destroyGame();
    }
});

var destroyGame = function() {
    if (game) {
        game.destroy(true);
        game = null;
    }
    $('canvas').remove();
}