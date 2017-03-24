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
			<div>
				<div className="row">
					<div className="row game-option">
						<div className="col-xs-12">
							<h4>Join a game using an id:</h4>
							<div className="row">
								<div className="col-xs-9">
									<input type="text" placeholder="Enter the id of the game" />
								</div>
								<div className="col-xs-2">
									<button className="options"> Join </button>
								</div>
							</div>
						</div>
					</div>
					<div className="row game-option">
						<div className="col-xs-12">
							<h4>Create a game:</h4>
							<div className="row create-game">
								<div className="col-xs-6">
									<button className="options" onClick={()=>{Meteor.call('games.newGame')}}> Public game</button>
								</div>
								<div className="col-xs-6">
									<button className="options" onClick={()=>{Meteor.call('games.newGame', true)}}> Private game</button>
								</div>
							</div>
						</div>
					</div>
					<div className="row game-option">
						<div className="col-xs-12">
							<h4>Browse games:</h4>
						</div>
					</div>
				</div>
				<div className={'row'+(this.props.availableGames.length!==0?' game-list':'')}>
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
