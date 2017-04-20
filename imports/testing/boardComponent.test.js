/* global describe*/
/* global it*/
/* global Meteor*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint "react/jsx-filename-extension": [0] */
/* eslint "import/no-unresolved": [0] */
// Cambie a waiting al crear partida publica o privada
// que cambie al tablero de juego si hace join ya sea por id o de la lista
// que cambie entre la lista de historico y la lista de juegos disponibles
// que de waiting vuelva al board al poner exit
// que del game vuelva al board al poner give up

import React from 'react';
import { Random } from 'meteor/random';
import { render } from 'enzyme';
import { assert } from 'meteor/practicalmeteor:chai';
import Board from '../ui/Board.jsx';

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
/* <Board
games={this.props.games}
historicGames={this.props.historicGames}
activeGame={this.props.activeGame}
hideNavBar={this.hideNavBar.bind(this)}
showNavBar={this.showNavBar.bind(this)}
/>*/

describe('Available games', () => {
  if (Meteor.isServer) return;
  it('should render', () => {
    const game = {
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { }, // datos jugador 2
      cols: [[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]], // matriz donde cols[columna][fila]
      turn: 0, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
      state: 'waiting', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
    };
    const item = render(<Board games={[game]} historicGames={[]} activeGame={[]} />);
    assert.equal(item.find('.game-item').length, 1);
  });
});

describe('Historic games', () => {
  if (Meteor.isServer) return;
  it('should render', () => {
    const game = {
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { }, // datos jugador 2
      cols: [[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]], // matriz donde cols[columna][fila]
      turn: 0, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
      state: 'waiting', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
    };
    const item = render(<Board games={[]} historicGames={[game]} activeGame={[]} />);
    assert.notEqual(item.find('#historic-btn'), null);
    assert.include(item.find('#historic-btn').text(), 'Historic games');
  });
});

describe('Game board', () => {
  if (Meteor.isServer) return;
  it('should render', () => {
    const game = {
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { _id: Random.id(), username: 'user2' }, // datos jugador 2
      cols: [[0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]], // matriz donde cols[columna][fila]
      turn: 0, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
      state: 'playing', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
    };
    const item = render(<Board games={[]} historicGames={[]} activeGame={[game]} />);
    assert.equal(item.find('.game-footer').length, 1);
  });
});
