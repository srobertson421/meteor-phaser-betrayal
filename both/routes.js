// Configuration
Router.configure({
  layoutTemplate: 'main-layout'
});

// Routing
Router.route('/', function() {
  this.render('home');
}, {
  name: 'home'
});

Router.route('/create-game', function() {
  this.render('createGame');
}, {
  name: 'createGame'
});

Router.route('/game/:_id', {
  name: 'game',
  controller: 'GameController'
});

// Controllers
GameController = RouteController.extend({
  
  template: 'game',
  
  data: function() {
      return Games.findOne({_id: this.params._id});
  },
  
  action: function () {
    var game = Games.findOne({_id: this.params._id});
    Session.set('gameStarted', game.started);
    this.render();
  }
});

// Hooks
//Router.onBeforeAction(function() {});