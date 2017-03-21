import React, { Component } from 'react';
import GameThumbnail from './GameThumbnail.jsx';

export default class GameList extends Component {

	//Crear estado para visualizar pestañas de historico y juegos disponibles.
	//para historico puede reutilizar el GameThumbnail

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
				{
					this.props.availableGames.length===0?'There are no available games... Tell your friends!':
					this.props.availableGames.map((game)=>{
						return (
							<div key={game._id} className="col-xs-12">
								<GameThumbnail game={game} />
							</div>
							);
					})
				}
				</div>
			</div>
		);
	}
}