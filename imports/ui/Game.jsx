import React, { Component } from 'react';

export default class Game extends Component {

	move(colIndex) {
		Meteor.call('games.move', this.props.game._id, colIndex);
	}

	createRow(matrix, rowIndex) {
		let totCol=matrix.length;
		return (
			<tr key={rowIndex}>
			{matrix.map((col, index)=>{
				let chip = col[rowIndex];
				let cn = chip===0?'empty-chip':(chip===1?'p1-chip':'p2-chip');
				return (<td key={(totCol*rowIndex)+index} className="chip-container">
							<div className={cn}></div>
					    </td>);
			})}
			</tr>
		);
	}

	isMyTurn() {

		return (this.props.game.turn===0 && Meteor.userId()===this.props.game.p1._id) ||
			(this.props.game.turn===1 && Meteor.userId()===this.props.game.p2._id);
	}



	getGameState (){
		let matrix = this.props.game.cols;
		let col1 = matrix[0];
		return (
			<div className="row">
				<div className="col-sm-2 hidden-xs"></div>
				<div className="col-sm-8 col-xs-12">
					<table>
						<thead>
							<tr>
							{
								matrix.map((col, index) => {
									let canAdd = col[0]===0 && this.isMyTurn();
									let player = Meteor.userId()===this.props.game.p1._id?'p1-chip':'p2-chip';
									return (
										<th key={index}>
											<button className={player} onClick={ ()=>{ this.move(index) } } disabled={ !canAdd } > + </button>
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
				<div className="col-sm-2 hidden-xs"></div>
			</div>
			);
	}

	waiting() {
		return (
			<div className="waiting">
				<div className="row">
					<div className="col-xs-5"></div>
					<div className="col-xs-2">
						<div className="loading-waiting"></div>
					</div>
					<div className="col-xs-5"></div>
				</div>
				<div className="row">
					<div className="col-sm-3 hidden-xs"></div>
					<div className="col-sm-6 col-xs-12 loading-message">
						<h4>Waiting for player 2...</h4>
						<p>Share the game id with your friends!</p>
						<p><strong>Game ID: </strong>{this.props.game._id}</p>
						<button className="options" onClick={()=>{Meteor.call('games.end', this.props.game._id)}}> Exit </button>
					</div>
					<div className="col-xs-3 hidden-xs"></div>
				</div>
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
					</div>
					<div className="col-xs-6 p2-footer">
						<h2>Player 2</h2>
						<h3>{ this.props.game.p2.username }</h3>
					</div>
				</div>
			</div>
		);
	}

	handleWindowClose() {
		console.log('va a cerrar ventana');
		window.alert('cerrar');
		Meteor.call('games.giveUp', this.props.game._id);
	}

	componentDidMount() {
    	window.addEventListener('onbeforeunload', this.handleWindowClose);
	}

	componentWillUnmount() {
    	window.removeEventListener('onbeforeunload', this.handleWindowClose);
	}

	render() {
		return (
			<div>
			{ this.props.game.p2._id?this.getGameState():this.waiting() }
			{ this.props.game.p2._id?this.getGameFooter():'' }
			</div>
		);
	}
}
