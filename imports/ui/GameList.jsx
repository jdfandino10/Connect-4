/* global Meteor*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint "react/jsx-no-bind": [2, {
  "ignoreRefs": true,
  "allowArrowFunctions": true,
  "allowBind": true
}]*/
/* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint arrow-body-style: [0]*/
/* eslint "no-nested-ternary": [0] */
import React, { Component } from 'react';
import GameThumbnail from './GameThumbnail.jsx';
import GameThumbnailHistoric from './GameThumbnailHistoric.jsx';
import GenericMessage from './GenericMessage.jsx';

export default class GameList extends Component {
  // Crear estado para visualizar pestañas de historico y juegos disponibles.
  // para historico puede reutilizar el GameThumbnail

  constructor(props) {
    super(props);
    this.state = {
      historic: false,
      searchId: '',
      error: undefined,
    };
  }

  componentDidMount() {
    if (!this.props.modalIsOn) this.gamelist.focus();
  }

  setSearchId(newId) {
    this.setState({ searchId: newId });
  }

  seeHistoricGames() {
    this.setState({ historic: true });
  }

  seeJoinGames() {
    this.setState({ historic: false });
  }

  howManyIWon() {
    let hg = {};
    hg = this.props.historicGames;
    return hg.filter(game => game.winner === Meteor.user().username).length;
  }

  howManyTies() {
    let hg = {};
    hg = this.props.historicGames;
    return hg.filter(game => game.winner === 'tie').length;
  }

  joinGame(e) {
    e.preventDefault();
    const parent = this;
    Meteor.call('games.join', this.state.searchId, (err) => {
      parent.setState({ error: { error: err.error, reason: err.reason } });
    });
  }

  removeError() {
    this.setState({ error: undefined });
  }

  blockFocus() {
    // this.refs['join-input'].tabIndex = -1;
    // this.refs['join-button'].tabIndex = -1;
    // this.refs['create-public'].tabIndex = -1;
    // this.refs['create-private'].tabIndex = -1;
    // this.refs['list-public'].tabIndex = -1;
    // this.refs['list-private'].tabIndex = -1;
    this.props.blockFocus();
  }

  resetFocus() {
    // this.refs['join-input'].tabIndex = 0;
    // this.refs['join-button'].tabIndex = 0;
    // this.refs['create-public'].tabIndex = 0;
    // this.refs['create-private'].tabIndex = 0;
    // this.refs['list-public'].tabIndex = 0;
    // this.refs['list-private'].tabIndex = 0;
    // this.refs.gamelist.focus();
    this.props.resetFocus();
  }

  render() {
    return (
      <div ref={(gl) => { this.gamelist = gl; }} tabIndex="0">
        <div className="row" aria-hidden={this.state.error ? 'true' : 'false'}>
          <div className="row game-option">
            <div className="col-sm-6 col-xs-12">
              <label htmlFor="join"><h4>Join a game using
                an id:</h4></label>
              <div className="row">
                <div className="col-xs-8">
                  <form id="join-form">
                    <input
                      id="join" type="text" placeholder="Enter the game ID"
                      onChange={(e) => {
                        e.preventDefault(); this.setSearchId(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div className="col-xs-4">
                  <button form="join-form" value="Submit" className="options" onClick={this.joinGame.bind(this)}> Join </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xs-12 create-game">
              <h4>Create a game:</h4>
              <div className="row">
                <div className="col-xs-12">
                  <button className="options" onClick={() => { Meteor.call('games.newGame'); }}> Public game</button>
                  <button className="options" onClick={() => { Meteor.call('games.newGame', true); }}> Private game</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row game-option">
            <div className="col-xs-12">
              <h4>Browse games:</h4>
              <div className="row">
                <div className="col-xs-12">
                  <button className="options" onClick={(e) => { e.preventDefault(); this.seeJoinGames(); }}> Public games to join</button>
                  <button className="options" onClick={(e) => { e.preventDefault(); this.seeHistoricGames(); }}> Historic games</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row game-list" aria-hidden={this.state.error ? 'true' : 'false'}>
          <div className="col-xs-12">
            {
              this.state.historic ?
              (
                <div className="row">
                  <div className="col-xs-3 text-center">
                    <p><strong>Total: </strong>{this.props.historicGames.length}</p>
                  </div>
                  <div className="col-xs-3 text-center">
                    <p><strong>Won: </strong>{this.howManyIWon()}</p>
                  </div>
                  <div className="col-xs-3 text-center">
                    <p><strong>Lost: </strong>
                      {this.props.historicGames.length -
                        this.howManyIWon() - this.howManyTies()}</p>
                  </div>
                  <div className="col-xs-3 text-center">
                    <p><strong>Tie: </strong>{this.howManyTies()}</p>
                  </div>
                </div>
                ) : ''
              }
            {
                !this.state.historic ? this.props.availableGames.length === 0 ? 'There are no available games... Tell your friends!' :
                this.props.availableGames.map((game) => {
                  return (
                    <div key={game._id} className="col-xs-12">
                      <GameThumbnail game={game} />
                    </div>
                  );
                }) : this.props.historicGames.length === 0 ? 'You haven\'t played any game yet... Join a game or create one!' :
                this.props.historicGames.map((historicGame) => {
                  return (
                    <div key={historicGame._id} className="col-xs-12">

                      <GameThumbnailHistoric game={historicGame} />
                    </div>
                  );
                })
  }

          </div>
        </div>
        {
          this.state.error ? <GenericMessage
            title={this.state.error.error} message={this.state.error.reason}
            remove={this.removeError.bind(this)} blockFocus={this.blockFocus.bind(this)}
            resetFocus={this.resetFocus.bind(this)}
          /> : ''
  }
      </div>
    );
  }
}
