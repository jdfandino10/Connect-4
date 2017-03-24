import React, { Component } from 'react';
import GameList from './GameList.jsx';
import Game from './Game.jsx';
import Message from './Message.jsx';

export default class Board extends Component {

	constructor(props){
		super(props);
		this.state = {
			modal: 'hidden'
		}
	}

	availableGames() {
		let avGames = this.props.games;
		return avGames.filter(game => game.state==='waiting');
	}


	//renderizar nuevo componente que muestra el ganador.
	//para eso debe revisar que newProps: 1. este en playing 2.Todo cols[i][0]!==0
	//en ese caso llama el metodo Meteor.call('games.winner') (tambien falta ese metodo)
	//si winner esta definido, mostrar componente de dialogo que muestre el ganador y puntos de cada jugador
	//tambien mensaje personalizado segun si gano o perdio el usuario actual
	componentWillReceiveProps(newProps) {
		console.log('newProps');
		if(newProps.activeGame){
					if (newProps.activeGame.length>0)
					{
						console.log(newProps.activeGame[0].state == 'playing');
						if (newProps.activeGame[0].state == 'playing'){
							console.log(newProps.activeGame[0].p1.score);
							if(typeof newProps.activeGame[0].p1.score == 'undefined'){
								let notFinished = newProps.activeGame[0].cols.some(function(row){
											return row[0] === 0;
										});
									if (!notFinished){
										Meteor.call('games.winner', newProps.activeGame[0]._id);
									}
							}
							else{
								console.log('mensaje');
								this.setState({modal:'show'});
							}
						}
				}
		}
	}

	render() {
		console.log(this.props.activeGame);
		return(
			<div>
			{this.props.activeGame.length>0 ? (<div className="possible-games">
										<Game game={this.props.activeGame[0]} />
									 </div>):
									 	<GameList availableGames={this.availableGames()} historicGames={this.props.historicGames}/>
			}

				{this.props.activeGame.length>0?
				<Message show={this.state.modal} toggleModal={(mod)=>{this.setState({modal:mod})}} game={this.props.activeGame[0]} finishGame={() => {Meteor.call('games.end', this.props.activeGame[0]._id)}}/>
				: <div></div>}
			</div>

			);
	}
}
