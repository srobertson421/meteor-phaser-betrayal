gameStream = new Meteor.Stream('gameStream');

gameStream.permissions.write(function() {
  return true;
});

gameStream.permissions.read(function() {
  return true;
});