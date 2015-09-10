Template.createGame.helpers({});

Template.createGame.events({
    'click #game-submit': function(e) {
        e.preventDefault();
        
        var newGame = {
            title: $('#title-field').val()
        }
        
        Meteor.call('createGame', newGame,  function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                Router.go('home');
            }
        });
    }
});