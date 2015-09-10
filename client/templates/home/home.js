// Configure Accounts to require username instead of email
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Template.home.helpers({
    games: function() {
        return Games.find({});
    },
    
    users: function() {
        return Meteor.users.find({"status.online": true});
    }
});

Template.home.events({
    'click #create-game-button': function(e) {
        e.preventDefault();
        
        Router.go('createGame');
    }
});

Template.userPill.helpers({
    labelClass: function() {
        if (this.status.idle)
            return "label-warning"
        else if (this.status.online)
            return "label-success"
        else
            return "label-default"
    }
});