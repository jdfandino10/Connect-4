/* global describe*/
/* global it*/
/* global Meteor*/
/* global beforeEach*/
/* global afterEach*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint "react/jsx-filename-extension": [0] */
/* eslint "import/no-unresolved": [0] */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { render } from 'enzyme';
import { assert } from 'meteor/practicalmeteor:chai';
import Message from '../ui/Message.jsx';

const id = Random.id();

describe('Message', () => {
  if (Meteor.isServer) return;


  Meteor.userId = function userId() {
    // basado en https://github.com/Llamatech/review-me/blob/master/imports/ui/proyecto/proyecto.test.jsx#L20
    return id;
  };

  Meteor.user = function user() {
    // basado en https://github.com/Llamatech/review-me/blob/master/imports/ui/proyecto/proyecto.test.jsx#L24
    return { username: 'username' };
  };

  it('should have ok button', () => {
    const game = {
      _id: Random.id(),
      p1: { _id: Random.id(), username: 'username' }, // datos jugador 1
      p2: { _id: Random.id(), username: 'user2' }, // datos jugador 2
      state: '', // estado: waiting, playing, ended
      dateStarted: new Date(), // fecha inicio
      p: false,
    };
    const item = render(<Message game={game} finishGame={[]} blockFocus={[]} resetFocus={[]} />);
    assert.equal(item.find('.btn.options').length, 1);
    assert.equal(item.find('.btn.options').text(), 'Ok');
  });
});
