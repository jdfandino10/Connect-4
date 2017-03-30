/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/* eslint disable*/
export const Games = new Mongo.Collection('games');
/* eslint enable*/

if (Meteor.isServer) {
  Meteor.publish('games', function gamesPublication() {
    return Games.find({ $or: [
        { $and: [{ p: { $ne: true } }, { state: { $eq: 'waiting' } }] }, // cambiar esto a que el juego tenga estado waiting y no sea privado
        { $or: [
          { 'p1._id': { $eq: this.userId } },
          { 'p2._id': { $eq: this.userId } },
        ] },
      ]}
    );
  });
}
/*
game: {
  p1: {_id, username, score}, // datos jugador 1
  p2: {_id, username, score}, // datos jugador 2
  cols: [[0,0,0,0,0]....,[1,2,0,0,0]], // matriz donde cols[columna][fila]
  turn, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
  state, // estado: waiting, playing, ended
  date_started, // fecha inicio
  date_ended, // fecha finalizacion
  winner, // undefined o string del username ganador. Si un jugador se retira el que queda queda ganador
  p, // boolean que indica si la sesion es privada (solo se puede unir con el id del juego) true si privada, false de lo contrario
  giveUp, // boolean que indica si el ganador es por rendicion del contrincante
}
*/

function getPoints(matrix, i, j) {
  let pts = 0;
  pts += getPointsUp(matrix, i, j);
  pts += getPointsUpDiag(matrix, i, j);
  pts += getPointsRight(matrix, i, j);
  pts += getPointsDownDiag(matrix, i, j);
  return pts;
}

function getPointsUp(matrix, i, j) {
  var initial = matrix[i][j];
  var good = initial !==0 && (i+3) < matrix.length;
  for (var k=0; k<4 && good; k++) {
    good = matrix[i+k][j] === initial;
  }
  return good ? 1 : 0;
}

function getPointsUpDiag(matrix, i, j) {
  var initial = matrix[i][j];
  var good = initial !== 0 && (i+3) < matrix.length && (j+3) < matrix[i].length;
  for (var k=0; k<4 && good; k++) {
    good = matrix[i+k][j+k] === initial;
  }
  return good ? 1 : 0;
}

function getPointsRight(matrix, i, j) {
  var initial = matrix[i][j];
  var good = initial !== 0 && (j+3) < matrix[i].length;
  for (var k=0; k<4 && good; k++) {
    good = matrix[i][j+k] === initial;
  }
  return good ? 1 : 0;
}

function getPointsDownDiag(matrix, i, j) {
  var initial = matrix[i][j];
  var good = initial !==0 && (i-3) >= 0 && (j+3) < matrix[i].length;
  for (var k=0; k<4 && good; k++) {
    good = matrix[i-k][j+k] === initial;
  }
  return good ? 1 : 0;
}

Meteor.methods({
  'games.newGame'(p=false) {
    let cols = [];
    for(var i = 0; i<7; i++){
      var c = [];
      for(var j = 0; j<6; j++){
        c[j] = 0;
      }
      cols[i]=c;
    }
    let p1 = { _id:this.userId, username:Meteor.user().username };
    let p2 = { _id:undefined, username:undefined };
    let turn = 0;
    let state = 'waiting';
    let date_started = new Date();
    const game = { p1, p2, cols, turn, state, date_started, p };
    Games.insert(game);
  },
  'games.winner'(gameId) {
    check(gameId, String);
    // hace validacion y cambia el winner y el score(NO EL ESTADO)

    const game = Games.findOne(gameId);
    let scoreP1 = 0, scoreP2 = 0;
    let matrix = game.cols;
    for (var i=0; i<matrix.length; i++) {
      for (var j=0; j<matrix[i].length; j++) {
        var pts = getPoints(matrix, i, j);
        if (matrix[i][j] === 1) scoreP1 += pts;
        else if (matrix[i][j] === 2) scoreP2 += pts;
      }
    }
    game.p1.score = scoreP1;
    game.p2.score = scoreP2;
    let winner = scoreP1>scoreP2 ? game.p1.username : (scoreP2>scoreP1 ? game.p2.username : 'tie');
    Games.update(gameId, { $set: { p1: game.p1, p2: game.p2, winner } });
  },
  'games.giveUp'(gameId) {
    check(gameId, String);

    const game = Games.findOne(gameId);
    let giveUp = true;
    let winner = Meteor.user().username === game.p1.username ? game.p2.username : game.p1.username;
    Games.update(gameId, { $set: { state: 'ended', giveUp, winner } });
  },
  'games.end'(gameId) {
    check(gameId, String);

    Games.update(gameId, { $set: { state: 'ended', date_ended: new Date() } });
  },
  'games.join'(gameId) {
    check(gameId, String);

    const game = Games.findOne(gameId);
    if(!game) throw new Meteor.Error('Can\'t join game', 'There is no game with such id');
    if(game.state === 'playing') throw new Meteor.Error('Can\'t join game', 'The game is already playing');
    if(game.state === 'ended') throw new Meteor.Error('Can\'t join game', 'Game is over');
    let player = { _id:this.userId, username:Meteor.user().username };
    Games.update(gameId, { $set: { p2: player, state:'playing' } });
  },
  'games.move'(gameId, col) {
    check(gameId, String);
    check(col, Number);

    const game = Games.findOne(gameId);
    if ((game.turn === 0 && this.userId !== game.p1._id) ||
      (game.turn === 1 && this.userId !== game.p2._id)) {
      throw new Meteor.Error('not-authorized');
    }
    const gameCol = game.cols[col];
    let i = gameCol.length - 1;
    while (i >= 0 && gameCol[i] !== 0) i-=i;
    if (game.cols[col][i] !== 0) throw new Meteor.Error('not-authorized');
    game.cols[col][i] = game.turn + 1;
    Games.update(gameId, { $set: { cols:game.cols, turn: (game.turn + 1) % 2 } });
  },

});
