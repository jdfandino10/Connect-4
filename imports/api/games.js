/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/
/* eslint prefer-const: "off"*/
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');
export default Games;

if (Meteor.isServer) {
  Meteor.publish('games', function gamesPublication() {
    return Games.find({ $or: [
        { $and: [{ p: { $ne: true } }, { state: { $eq: 'waiting' } }] }, // cambiar esto a que el juego tenga estado waiting y no sea privado
      { $or: [
          { 'p1._id': { $eq: this.userId } },
          { 'p2._id': { $eq: this.userId } },
      ] },
    ] },
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
  dateStarted, // fecha inicio
  date_ended, // fecha finalizacion
  winner, // undefined o string del username ganador. Si un jugador se retira el
          que queda queda ganador
  p, // boolean que indica si la sesion es privada (solo se puede unir con el id
          del juego) true si privada, false de lo contrario
  giveUp, // boolean que indica si el ganador es por rendicion del contrincante
  chat, [] // Arreglo de strings con los mensajes de los jugadores
}
*/

function getPointsUp(matrix, i, j) {
  const initial = matrix[i][j];
  let good = initial !== 0 && (i + 3) < matrix.length;
  for (let k = 0; k < 4 && good; k++) {
    good = matrix[i + k][j] === initial;
  }
  return good ? 1 : 0;
}

function getPointsUpDiag(matrix, i, j) {
  const initial = matrix[i][j];
  let good = initial !== 0 && (i + 3) < matrix.length && (j + 3) < matrix[i].length;
  for (let k = 0; k < 4 && good; k++) {
    good = matrix[i + k][j + k] === initial;
  }
  return good ? 1 : 0;
}

function getPointsRight(matrix, i, j) {
  const initial = matrix[i][j];
  let good = initial !== 0 && (j + 3) < matrix[i].length;
  for (let k = 0; k < 4 && good; k++) {
    good = matrix[i][j + k] === initial;
  }
  return good ? 1 : 0;
}

function getPointsDownDiag(matrix, i, j) {
  const initial = matrix[i][j];
  let good = initial !== 0 && (i - 3) >= 0 && (j + 3) < matrix[i].length;
  for (let k = 0; k < 4 && good; k++) {
    good = matrix[i - k][j + k] === initial;
  }
  return good ? 1 : 0;
}

function getPoints(matrix, i, j) {
  let pts = 0;
  pts += getPointsUp(matrix, i, j);
  pts += getPointsUpDiag(matrix, i, j);
  pts += getPointsRight(matrix, i, j);
  pts += getPointsDownDiag(matrix, i, j);
  return pts;
}

Meteor.methods({
  'games.newGame': function newGame(p = false) {
    const cols = [];
    for (let i = 0; i < 7; i++) {
      const c = [];
      for (let j = 0; j < 6; j++) {
        c[j] = 0;
      }
      cols[i] = c;
    }
    let username = this.username || Meteor.user().username;
    const p1 = { _id: this.userId, username };
    const p2 = { _id: undefined, username: undefined };
    const turn = 0;
    const state = 'waiting';
    const dateStarted = new Date();
    const game = { p1, p2, cols, turn, state, dateStarted, p };
    Games.insert(game);
  },
  'games.winner': function winner(gameId) {
    check(gameId, String);
    // hace validacion y cambia el winner y el score(NO EL ESTADO)

    const game = Games.findOne(gameId);
    let scoreP1 = 0;
    let scoreP2 = 0;
    const matrix = game.cols;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const pts = getPoints(matrix, i, j);
        if (matrix[i][j] === 1) scoreP1 += pts;
        else if (matrix[i][j] === 2) scoreP2 += pts;
      }
    }
    game.p1.score = scoreP1;
    game.p2.score = scoreP2;
    let pWinner = 'tie';
    if (scoreP1 > scoreP2) pWinner = game.p1.username;
    else if (scoreP2 > scoreP1) pWinner = game.p2.username;
    Games.update(gameId, { $set: { p1: game.p1, p2: game.p2, winner: pWinner } });
  },
  'games.giveUp': function giveUp(gameId) {
    check(gameId, String);

    let username = this.username || Meteor.user().username;
    const game = Games.findOne(gameId);
    let givesUp = true;
    const winner = username === game.p1.username ?
                        game.p2.username : game.p1.username;
    Games.update(gameId, { $set: { state: 'ended', givesUp, winner } });
  },
  'games.end': function end(gameId) {
    check(gameId, String);

    Games.update(gameId, { $set: { state: 'ended', date_ended: new Date() } });
  },
  'games.join': function join(gameId) {
    check(gameId, String);

    let username = this.username || Meteor.user().username;
    const game = Games.findOne(gameId);
    if (!game) throw new Meteor.Error('Can\'t join game', 'There is no game with such id');
    if (game.state === 'playing') throw new Meteor.Error('Can\'t join game', 'The game is already playing');
    if (game.state === 'ended') throw new Meteor.Error('Can\'t join game', 'Game is over');
    const player = { _id: this.userId, username };
    Games.update(gameId, { $set: { p2: player, state: 'playing' } });
  },
  'games.move': function move(gameId, col) {
    check(gameId, String);
    check(col, Number);

    const game = Games.findOne(gameId);
    if ((game.turn === 0 && this.userId !== game.p1._id) ||
      (game.turn === 1 && this.userId !== game.p2._id)) {
      throw new Meteor.Error('not-authorized');
    }
    const gameCol = game.cols[col];
    let i = gameCol.length - 1;
    while (i >= 0 && gameCol[i] !== 0) i -= 1;
    if (game.cols[col][i] !== 0) throw new Meteor.Error('not-authorized');
    game.cols[col][i] = game.turn + 1;
    Games.update(gameId, { $set: { cols: game.cols, turn: (game.turn + 1) % 2 } });
  },
  'games.chat': function chat(gameId, message) {
    check(gameId, String);
    check(message, String);

    const game = Games.findOne(gameId);
    if (game.chat) game.chat.push(message);
    else {
      game.chat = [message];
    }
    Games.update(gameId, { $set: { chat: game.chat } });
  },
});
