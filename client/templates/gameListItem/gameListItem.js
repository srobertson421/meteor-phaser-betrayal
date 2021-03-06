Template.gameListItem.helpers({
    owned: function() {
        if (Meteor.userId() === this.owner) {
            return true;
        }
    },
    
    notInGame: function() {
        
        var currentUser = Meteor.userId();
        
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (player.id === currentUser) {
                return false;
            }
        }
        
        return true;
    },
    
    available: function() {
        if (this.players.length < 6 && this.players.length > 0 && !this.started && !this.ended) {
            return true;
        }
    }
});

Template.gameListItem.events({
    'click .delete-button': function(e) {
      e.preventDefault();
        
      if (Meteor.userId() === this.owner) {
        if (confirm('Are you sure you want to delete?')) {
          Meteor.call('deleteGame', this._id, function(error, result) {
            if (error) {
                throwError(error.reason);
            }
          });
        }    
      }
    },
    
    'click h4': function(e) {
        e.preventDefault();
        
        Router.go('game', {_id: this._id});
    },
    
    'click .join-button': function(e) {
        e.preventDefault();
        
        Meteor.call('addPlayerToGame', Meteor.userId(), this._id, function(error, result) {
            if (error) {
                throwError(error.reason);
            }
        });
        
        Router.go('game', {_id: this._id});
    }
});