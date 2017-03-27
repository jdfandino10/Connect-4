import React, { Component } from 'react';
import GameList from './GameList.jsx';
import Game from './Game.jsx';
import Message from './Message.jsx';

export default class Board extends Component {

	constructor(props){
		super(props);
		this.state = {
			modal: false,
		}
	}

	availableGames() {
		let avGames = this.props.games;
		return avGames.filter(game => game.state==='waiting');
	}

	historicGames() {
		let hGames = this.props.historicGames;
		return hGames.filter(game => game.p1._id && game.p2._id);
	}


	//renderizar nuevo componente que muestra el ganador.
	//para eso debe revisar que newProps: 1. este en playing 2.Todo cols[i][0]!==0
	//en ese caso llama el metodo Meteor.call('games.winner')
	//si winner esta definido, mostrar componente de dialogo que muestre el ganador y puntos de cada jugador
	//tambien mensaje personalizado segun si gano o perdio el usuario actual
	componentWillReceiveProps(newProps) {
		if(newProps.activeGame){
			if (newProps.activeGame.length>0) {
				if (newProps.activeGame[0].state == 'playing'){
					if(typeof newProps.activeGame[0].p1.score == 'undefined'){
						let notFinished = newProps.activeGame[0].cols.some(function(row){
							return row[0] === 0;
						});
						if (!notFinished){
							Meteor.call('games.winner', newProps.activeGame[0]._id);
						}
					} else {
						this.setState({modal:true});
					}
				}
			}
		}
	}

	endGame() {
		if(this.props.activeGame[0]){
			Meteor.call('games.end', this.props.activeGame[0]._id);
		}
		this.setState({modal: false});
	}

	componentWillUnmount() {
		//this.setState({modal: false});
	}

	render() {
		return(
			<div className="row">
			{this.props.activeGame.length>0 ? (<div className="possible-games">
										<Game game={this.props.activeGame[0]} />
									 </div>):
									 	<GameList availableGames={this.availableGames()} historicGames={this.historicGames()}/>
			}

				{this.state.modal?
				<Message game={this.props.activeGame[0]} finishGame={() => {this.endGame()}}/>
				: ''}
			</div>

			);
	}
}
