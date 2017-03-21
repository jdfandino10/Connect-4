import React, { Component } from 'react';
import GameList from './GameList';
import Game from './Game';

export default class Board extends Component {

	availableGames() {
		let avGames = this.props.games;
		return avGames.filter(game => game.state==='waiting');
	}

	componentWillReceiveProps(newProps) {
		//renderizar nuevo componente que muestra el ganador.
		//para eso debe revisar que newProps: 1. este en playing 2.Todo cols[i][0]!==0
		//en ese caso llama el metodo Meteor.call('games.winner') (tambien falta ese metodo)
		//si winner esta definido, mostrar componente de dialogo que muestre el ganador y puntos de cada jugador
		//tambien mensaje personalizado segun si gano o perdio el usuario actual
	}

	render() {
		console.log(this.props.activeGame);
		return(
			<div>
			<h2>Aquí info de estadisticas y opciones para iniciar juego</h2>
			{this.props.activeGame.length>0 ? (<div className="possible-games">
										<Game game={this.props.activeGame[0]} />
									 </div>):
									 	<GameList availableGames={this.availableGames()} historicGames={this.props.historicGames}/>									 
			}
				
			</div>
			);
	}
}