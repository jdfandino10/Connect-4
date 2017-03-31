/* global Meteor*/
/* "prefer-stateless-function": 0 */
import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="row intro-page">
        <div className="row play-now">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-xs-7">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Play now!</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <p>Create or join public or private games and play online with
                  your friends. Just login or create an account to get started.</p>
                  </div>
                </div>
              </div>
              <div className="col-xs-5">
                <img src="./imgs/table.png" alt="Connect 4 table" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>What’s connect-4?</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <p>Connect-4 is a very simple <strong>board game</strong>.
                      On a 6x7 grid players must insert
                    chips alternately. The main goal is to get the
                    <strong>largest number of 4 chips in a
                  row</strong>, either horizontally, vertically or diagonally.
                  <strong>Strategy</strong> is the key!</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xs-12">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Why play here?</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <p>You can play <strong>real time</strong> with a
                    random person or with a friend, for you to
                  be the <strong>master</strong> of connect-4!... Or just
                  for killing time. You can also see your <strong>historic results</strong>,
                  where you can see who you have beaten and other useful statistics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
