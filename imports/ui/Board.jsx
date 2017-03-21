import React, { Component } from 'react';
import GameList from './GameList';
import Game from './Game';

export default class Board extends Component {

	availableGames() {
		let avGames = this.props.games;
		return avGames.filter(game => game.state==='waiting');
	}

	render() {
		console.log(this.props.activeGame);
		return(
			<div>
			<h2>Aquí info de estadisticas y opciones para iniciar juego</h2>
			{this.props.activeGame.length>0 ? (<div className="possible-games">
										<Game game={this.props.activeGame[0]} />
									 </div>):
									 	<GameList availableGames={this.availableGames()} />									 
			}
				
			</div>
			);
	}
}