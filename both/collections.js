Games = new Meteor.Collection('games');

var Schemas = {};

Schemas.GamePlayer = new SimpleSchema({
  id: {
    type: String,
    label: "Player Id"
  },
  name: {
    type: String,
    label: "Player username"
  }
});

Schemas.Games = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 150
  },
  createdAt: {
    type: Date,
    label: "Created Date"
  },
  owner: {
    type: String,
    label: "Owner Id"
  },
  ownerName: {
    type: String,
    label: "Owner username"
  },
  players: {
    type: [Schemas.GamePlayer],
    label: "Players Array",
    minCount: 1,
    maxCount: 6
  },
  started: {
    type: Boolean,
    label: "Game Started Switch"
  },
  ended: {
    type: Boolean,
    label: "Game Ended Switch"
  },
  turn: {
    type: String,
    label: "Player Turn Tracker"
  }
});

Games.attachSchema(Schemas.Games);