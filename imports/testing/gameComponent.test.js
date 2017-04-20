/* global Meteor*/
/* global describe*/
/* global it*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint "react/jsx-filename-extension": [0] */
// que al mandar un mensaje de chat se agregue un mensaje
// que al agregar una ficha se agregue efectivamente

import React from 'react';
import { Random } from 'meteor/random';
import { render } from 'enzyme';
import { assert } from 'meteor/practicalmeteor:chai';
import Game from '../ui/Game.jsx';


describe('Game', () => {
  if (Meteor.isServer) return;
  it('should have a coin', () => {
    const game = {
      _id: Random.id(),
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { _id: Random.id(), username: 'user2' }, // datos jugador 2
      cols: [[1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]], // matriz donde cols[columna][fila]
      turn: 0, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
      state: 'playing', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
    };
    const item = render(<Game game={game} />);
    assert.equal(item.find('.p2-chip').length, 7);
    assert.equal(item.find('.p1-chip').length, 1);
  });
});


describe('Chat', () => {
  if (Meteor.isServer) return;
  it('should render the chat with a message', () => {
    const game = {
      _id: Random.id(),
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { _id: Random.id(), username: 'user2' }, // datos jugador 2
      cols: [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0]], // matriz donde cols[columna][fila]
      turn: 0, // 0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
      state: 'playing', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
      chat: ['username: chat'],
    };
    const item = render(<Game game={game} />);
    assert.equal(item.find('#chat').length, 1);
    assert.equal(item.find('#chat > div').length, 1);
  });
});
