import React, { Component } from 'react';
import GameThumbnail from './GameThumbnail.jsx';
import GameThumbnailHistoric from './GameThumbnailHistoric.jsx';

export default class GameList extends Component {

	//Crear estado para visualizar pestañas de historico y juegos disponibles.
	//para historico puede reutilizar el GameThumbnail

	constructor(props){
		super(props);
		this.state = {
			historic: false
		}
	}

	seeJoinGame () {
		this.setState({historic: false});
	}

	seeHistoricGames (){
		this.setState({historic: true});
	}


	render() {
		return (
			<div className="game-list">
				<div className="row">
					<div className="col-xs-3 col-md-6"></div>
					<div className="col-xs-3 col-md-2">
						<button onClick={()=>{Meteor.call('games.newGame')}}> Create public game</button>
					</div>
					<div className="col-xs-3 col-md-2">
						<button onClick={()=>{Meteor.call('games.newGame', true)}}> Create private game</button>
					</div>
					<div className="col-xs-3 col-md-2">
						<button> Join game with Id</button>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-3 col-md-6">
						<button onClick={this.seeJoinGame.bind(this)}>List of available games to join</button>
						<button onClick={this.seeHistoricGames.bind(this)}>See your historic games</button>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
					{
						!this.state.historic?	this.props.availableGames.length===0? 'There are no available games... Tell your friends!':
						this.props.availableGames.map((game)=>{
							return (
								<div key={game._id} className="col-xs-12">
									<GameThumbnail game={game} />
								</div>
								);
						}): this.props.historicGames.length===0?'You have not play a game until now... Join a game or create one!':
						this.props.historicGames.map((historicGame)=>{
							return (
								<div key={historicGame._id} className="col-xs-12">
									<GameThumbnailHistoric game={historicGame} />
								</div>
								);
						})
					}
					</div>
				</div>
			</div>
		);
	}
}
