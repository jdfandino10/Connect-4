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
import { render } from 'enzyme';
import { assert } from 'meteor/practicalmeteor:chai';
import GenericMessage from '../ui/GenericMessage.jsx';

describe('Generic Message', () => {
  if (Meteor.isServer) return;

  it('should have ok button', () => {
    const item = render(<GenericMessage />);
    assert.equal(item.find('.btn.options').length, 1);
    assert.equal(item.find('.btn.options').text(), 'Ok');
  });

  it('should have title', () => {
    const item = render(<GenericMessage title={'title'} />);
    assert.equal(item.find('.text-center.game-over').length, 1);
    assert.equal(item.find('.text-center.game-over').text(), 'title');
  });

  it('should have message', () => {
    const item = render(<GenericMessage message={'the message'} />);
    assert.equal(item.find('.col-xs-12.text-center').length, 2);
    assert.include(item.find('.col-xs-12.text-center').text(), 'the message');
  });
});
