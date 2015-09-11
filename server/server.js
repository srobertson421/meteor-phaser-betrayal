Meteor.publish('games', function() {
    return Games.find({});
});

// Publishing a "directory" of current users
Meteor.publish('userStatus', function() {
    return Meteor.users.find({"status.online": true}, {fields: {status: 1, username: 1}});
});

Meteor.methods({
    createGame: function(newGame) {
        
        var userObj = {
            id: Meteor.userId(),
            name: Meteor.user().username
        }
        
        Games.insert({
            title: newGame.title,
            createdAt: new Date(),
            owner: Meteor.userId(),
            ownerName: Meteor.user().username,
            players: [userObj],
            started: false,
            ended: false
        });
    },
    
    deleteGame: function(gameId) {
        Games.remove(gameId);
    },
    
    updateGame: function(gameId, newValues) {
        Games.update(gameId, {$set: newValues});
    },
    
    addPlayerToGame: function(playerId, gameId) {
        
        var userObj = {
            id: playerId,
            name: Meteor.user().username
        }
        
        Games.update(gameId, {$push: {players: userObj}});
    },
    
    removePlayerFromGame: function(playerId, gameId) {
        
        Games.update(gameId, {$pull: {players: {id: playerId}}});
        
    }
});