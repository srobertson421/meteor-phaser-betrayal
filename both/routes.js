Router.configure({
  layoutTemplate: 'main-layout'
});

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

Router.route('/game/:_id', function() {
  this.render('game', {
    data: function() {
      return Games.findOne({_id: this.params._id});
    }
  });
}, {
  name: 'game'
});