/* global Meteor*/
/* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint "no-nested-ternary": [0] */
import React, { Component } from 'react';

export default class GameThumbnailHistoric extends Component {

  getAdversary() {
    let p1 = {};
    p1 = this.props.game.p1;
    let p2 = {};
    p2 = this.props.game.p2;
    return p1.username === Meteor.user().username ? p2.username : p1.username;
  }

  render() {
    return (
      <div className="col-xs-12 game-item">
        <div className="row">
          <div className="col-sm-8 col-xs-12">
            <div className="row">
              <h3>Game vs. {this.getAdversary()}</h3>
            </div>
            <div className="row">
              {this.props.game.winner === Meteor.user().username
                ? <h4 className="winner-msg">You Won!</h4> : this.props.game.winner !== 'tie' ?
                  <h4 className="loser-msg">You lost...</h4> : <h4>Tie, good game!</h4>}
            </div>
          </div>
          <div className="col-sm-4 col-xs-12">
            <div className="row">
              <h3>Results:</h3>
            </div>
            <div className="row">
              <p><strong>{this.props.game.p1.username}:</strong> {this.props.game.p1.score}</p>
              <p><strong>{this.props.game.p2.username}:</strong> {this.props.game.p2.score}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


/*
<div className="col-xs-12 game-item">
  <div className="row">
  <div className="col-xs-4 col-md-4">
  <img src="./imgs/thumb.png" alt="" />
  </div>
  <div className="col-xs-8 col-md-8">
  <div className="row">
  <div className="col-xs-12 text-center">
  <h3>{this.props.game.p1.username} game!</h3>
  </div>
  </div>
  <div className="row">
  <div className="col-xs-6 col-sm-6 ">
  {this.props.game.winner != 'tie'?
  <h2>Winner!!!<span className="red"></span>: {this.props.game.winner}</h2>
  :<h2>It was a {this.props.game.winner}!!!<span className="red"></span></h2>}

  {this.props.game.winner === Meteor.user().username
  ?<h3>You Won!</h3>: this.props.game.winner != 'tie'? <h3>Maybe
  the next time ;)</h3>:<h3>Good game!</h3>}
  </div>
  <div className="col-xs-6 create-game">
  <h4>Scores:</h4>
  <div className="row">
  <div className="col-xs-12">
  <h4>Score for {this.props.game.p1.username}: {this.props.game.p1.score}</h4>
  <h4>Score for {this.props.game.p2.username}: {this.props.game.p2.score}</h4>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
*/
