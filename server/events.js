gameStream = new Meteor.Stream('gameData');

gameStream.permissions.write(function() {
  return true;
});

gameStream.permissions.read(function() {
  return true;
});