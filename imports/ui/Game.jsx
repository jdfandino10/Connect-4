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
			<div>
				<table>
					<thead>
					<tr>
						{

							matrix.map((col, index) => {
							console.log(col[0]);
							console.log(this.isMyTurn());
							let canAdd = col[0]===0 && this.isMyTurn();
							console.log(canAdd);
							let player = Meteor.userId()===this.props.game.p1._id?'p1-chip':'p2-chip';
							console.log(player);
							return (
								<th key={index}>
									<button className={player} onClick={ ()=>{ this.move(index) } } disabled={ !canAdd } > + </button>
								</th>		
							);
						})}
					</tr>
					</thead>
					<tbody>
					{col1.map((colItem, index) => {
						return this.createRow(matrix, index);
					})}
					</tbody>
				</table>
			</div>
			);
	}

	render() {
		return (
				this.getGameState()
			);
	}
}