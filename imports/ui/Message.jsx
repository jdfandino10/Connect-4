/* global Meteor*/
/* global document*/
/* global window*/
/* eslint "react/jsx-no-bind": [2, {
  "ignoreRefs": true,
  "allowArrowFunctions": true,
  "allowBind": true
}]*//* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint prefer-const: "off"*/
/* eslint "class-methods-use-this":
[2, { "exceptMethods": ["stopPropagation"] }] */
import React, { Component } from 'react';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: this.props.game.pWinner,
      p1: { username: this.props.game.p1.username, score: this.props.game.p1.score },
      p2: { username: this.props.game.p2.username, score: this.props.game.p2.score },
    };
  }

  componentDidMount() {
    this.title.focus();
    this.props.blockFocus();
  }

  componentWillUnmount() {
    this.props.resetFocus();
  }

  close(e) {
    e.preventDefault();
    this.props.finishGame();
  }

  iWon() {
    let winner = this.state.winner;
    let me = Meteor.user().username;
    return winner === me;
  }

  tie() {
    return this.state.winner === 'tie';
  }

  stopPropagation(e) {
    let ev = e || window.event;
    ev.cancelBubble = true;
    if (ev.stopPropagation) ev.stopPropagation();
  }

  blockF(e) {
    let okButton = null;
    okButton = this.ok_button;
    let cancelButton = null;
    cancelButton = this.cancel_button;
    let firstTabStop = null;
    firstTabStop = okButton;
    let lastTabStop = null;
    lastTabStop = cancelButton || okButton;
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }
    if (e.keyCode === 27) {
      // closeModal();
    }
  }


  render() {
    return (
      <div>
        <div className="row fixed-container">
          <div className="message-float col-xs-12" onClick={this.close.bind(this)}>
            <div ref={(t) => { this.title = t; }} role="dialog" className="message-container" tabIndex="0" onClick={this.stopPropagation} onKeyDown={this.blockF.bind(this)}>
              <div className="row">
                <div className="col-xs-12">
                  <h2 className="text-center game-over">Game Over</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 results ">
                  {
                    this.iWon() ? <h2 className="winner-msg">You won!</h2> : (this.tie() ? <h2>Tie</h2> : <h2 className="loser-msg">You lost...</h2>)
                  }

                  { this.iWon() ?
                    <h3>Congratulations!</h3> : (this.state.winner !== 'tie' ? <h3>Better luck next time</h3> : <h3>Good game!</h3>)
                  }
                </div>
                <div className="col-xs-6 scores">
                  <h3>Scores</h3>
                  <div className="row">
                    <div className="col-xs-12">
                      <p><strong>{this.state.p1.username}:</strong> {this.state.p1.score} points</p>
                      <p><strong>{this.state.p2.username}:</strong> {this.state.p2.score} points</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 text-center">
                  <button ref={(ob) => { this.ok_button = ob; }} className="btn options" onClick={this.close.bind(this)}>Ok</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-overlay" onClick={this.close.bind(this)} />
      </div>

    );
  }
}
