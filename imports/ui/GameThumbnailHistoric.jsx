import React, { Component } from 'react';

export default class GameThumbnailHistoric extends Component {

	render(){
		return (
			<div className="col-xs-12 game-item">
				<div className="row">
					<div className="col-xs-4 col-md-4">
						<img src="./imgs/thumb.png" alt="" />
					</div>
					<div className="col-xs-8 col-md-8">
						<div className="row">
							<div className="col-xs-12 text-center">
								<h3>{this.props.game.p1.username} game!</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-6 ">
								{this.props.game.winner != 'tie'?
								<h2>Winner!!!<span className="red"></span>: {this.props.game.winner}</h2>
								:<h2>It was a {this.props.game.winner}!!!<span className="red"></span></h2>}

								{this.props.game.winner === Meteor.user().username
								?<h3>You Won!</h3>: this.props.game.winner != 'tie'? <h3>Maybe the next time ;)</h3>:<h3>Good game!</h3>}
							</div>
							<div className="col-xs-6 create-game">
								<h4>Scores:</h4>
								<div className="row">
									<div className="col-xs-12">
										<h4>Score for {this.props.game.p1.username}: {this.props.game.p1.score}</h4>
										<h4>Score for {this.props.game.p2.username}: {this.props.game.p2.score}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
