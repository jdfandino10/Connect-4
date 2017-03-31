/* global Meteor*/
/* global document*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/
/* eslint prefer-const: "off"*/
/* eslint "react/jsx-no-bind": [2, {
  "ignoreRefs": true,
  "allowArrowFunctions": true,
  "allowBind": true
}]*/
/* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint prefer-template: "off"*/
/* eslint "class-methods-use-this":
[2, { "exceptMethods": ["getPointsUp", "getPointsDownDiag", "getPointsUpDiag",
                        "getPointsRight",
                       "createRow"] }]
*/
import React, { Component } from 'react';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showGiveUp: false,
      p1score: 0,
      p2score: 0,
    };
  }


  componentDidMount() {
    this.refs.game.focus();
  }

  componentWillReceiveProps(newProps) {
    let p1score = 0;
    let p2score = 0;
    let matrix = newProps.game.cols;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let pts = this.getPoints(matrix, i, j);
        if (matrix[i][j] === 1) p1score += pts;
        else if (matrix[i][j] === 2) p2score += pts;
      }
    }
    this.setState({ p1score, p2score });
  }

// componentWillUnmount() {
   // window.removeEventListener('onbeforeunload', this.handleWindowClose)
//  }

  getPoints(matrix, i, j) {
    let pts = 0;
    pts += this.getPointsUp(matrix, i, j);
    pts += this.getPointsUpDiag(matrix, i, j);
    pts += this.getPointsRight(matrix, i, j);
    pts += this.getPointsDownDiag(matrix, i, j);
    return pts;
  }

  getPointsUp(matrix, i, j) {
    let initial = matrix[i][j];
    let good = initial !== 0 && i + 3 < matrix.length;
    for (let k = 0; k < 4 && good; k++) {
      good = matrix[i + k][j] === initial;
    }
    return good ? 1 : 0;
  }

  getPointsUpDiag(matrix, i, j) {
    let initial = matrix[i][j];
    let good = initial !== 0 && i + 3 < matrix.length && j + 3 < matrix[i].length;
    for (let k = 0; k < 4 && good; k++) {
      good = matrix[i + k][j + k] === initial;
    }
    return good ? 1 : 0;
  }

  getPointsRight(matrix, i, j) {
    let initial = matrix[i][j];
    let good = initial !== 0 && j + 3 < matrix[i].length;
    for (let k = 0; k < 4 && good; k++) {
      good = matrix[i][j + k] === initial;
    }
    return good ? 1 : 0;
  }

  getPointsDownDiag(matrix, i, j) {
    let initial = matrix[i][j];
    let good = initial !== 0 && i - 3 >= 0 && j + 3 < matrix[i].length;
    for (let k = 0; k < 4 && good; k++) {
      good = matrix[i - k][j + k] === initial;
    }
    return good ? 1 : 0;
  }

  getGameState() {
    let matrix = this.props.game.cols;
    let col1 = matrix[0];
    return (
      <div className="row">
        <div className="col-sm-2 hidden-xs" />
        <div className="col-sm-8 col-xs-12">
          <table>
            <thead>
              <tr>
                {
              matrix.map((col, index) => {
                let canAdd = col[0] === 0 && this.isMyTurn();
                let player = Meteor.userId() === this.props.game.p1._id ? 'p1-chip' : 'p2-chip';
                let i = index;
                return (
                  <th key={i}>
                    <button
                      aria-label={'Add chip to column ' + (index + 1)} className={player} onClick={() => { this.move(index); }}
                      disabled={!canAdd}
                    >
                      <span className="glyphicon glyphicon-plus" aria-hidden="true" />
                    </button>
                  </th>
                );
              })
              }
              </tr>
            </thead>
            <tbody>
              {col1.map((colItem, index) => {
                return this.createRow(matrix, index);
              })}
            </tbody>
          </table>
        </div>
        <div className="col-sm-2 hidden-xs" />
      </div>
    );
    }

  getGameFooter() {
    return (
      <div className="game-footer">
        <div className="row">
          <div className="col-xs-6 p1-footer">
            <h2>Player 1</h2>
            <h3>{ this.props.game.p1.username }</h3>
            <h3 role="status" aria-label="player 1 score" aria-live="polite">{ this.state.p1score }</h3>
          </div>
          <div className="col-xs-6 p2-footer">
            <h2>Player 2</h2>
            <h3>{ this.props.game.p2.username }</h3>
            <h3 role="status" aria-label="player 2 score" aria-live="polite">{ this.state.p2score }</h3>
          </div>
        </div>
      </div>
    );
  }

  move(colIndex) {
    Meteor.call('games.move', this.props.game._id, colIndex);
  }

  createRow(matrix, rowIndex) {
    let totCol = matrix.length;
    return (
      <tr key={rowIndex}>
        {matrix.map((col, index) => {
          let chip = col[rowIndex];
          let cn = 'p2-chip';
          let i = index;
          let pChip = (chip === 1 ? 'player 1 chip' : 'player 2 chip');
          if (chip === 0) cn = 'empty-chip';
          else if (chip === 1) cn = 'p1-chip';
          let aria = (chip === 0 ? 'empty chip' : pChip) + ' at column ' + (index + 1) + ' row ' + (6 - rowIndex);
          return (<td key={(totCol * rowIndex) + i} className="chip-container">
            <div role="log" className={cn} aria-live="polite">
              {chip !== 0 ? <span aria-label={aria} /> : ''}
            </div>
          </td>);
        })}
      </tr>
    );
  }

  isMyTurn() {
    return (this.props.game.turn === 0 && Meteor.userId() === this.props.game.p1._id) ||
  (this.props.game.turn === 1 && Meteor.userId() === this.props.game.p2._id);
  }

  copyToClipboard() {
    this.refs.game_id.select();
    document.execCommand('copy');
  }

  waiting() {
    return (
      <div className="waiting">
        <div className="row">
          <div className="col-xs-5" />
          <div className="col-xs-2">
            <div className="loading-waiting" />
          </div>
          <div className="col-xs-5" />
        </div>
        <div className="row">
          <div className="col-sm-2 hidden-xs" />
          <div className="col-sm-8 col-xs-12 loading-message">
            <h4>Waiting for player 2...</h4>
            <p>Share the game id with your friends!</p>
            <div className="row">
              <strong>Game ID: </strong><textarea ref="game_id" className="game-id text-center" rows="1" value={this.props.game._id} readOnly />
              <button className="options clip" title="Copy to clipboard" onClick={this.copyToClipboard.bind(this)} aria-label="Copy to clipboard">
                <span className="glyphicon glyphicon-paperclip" aria-hidden="true" />
              </button>
            </div>
            <button className="options" onClick={() => { Meteor.call('games.end', this.props.game._id); }}> Exit </button>
          </div>
          <div className="col-xs-2 hidden-xs" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div ref="game" tabIndex="0">
        { this.props.game.p2._id ? this.getGameState() : this.waiting() }
        { this.props.game.p2._id ? this.getGameFooter() : '' }
      </div>
    );
  }
}
