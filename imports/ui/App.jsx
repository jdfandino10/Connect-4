import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Login from './Login.jsx';
import Board from './Board.jsx';

import { Games } from '../api/games.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			'modal':false,
		};
	}

	componentDidMount() {
		$('html').attr('lang','eng');
	}

	hideNavBar() {
		this.setState({modal:true});
	}

	showNavBar() {
		this.setState({modal:false});
	}

	render() {
		return (
			<div className="container">
				<nav aria-hidden={this.state.modal?'true':'false'}>
					<div className="row">
						
						<div className="col-sm-9 col-xs-7 logo">
							<div className="row">
								<div className="col-xs-3 col-sm-2 logo-img-container">
									<div className="custom-right">
										<img className="logo-img" src="imgs/favicon.png" alt="" />
									</div>
								</div>
								<div className="col-xs-9 col-sm-10">
									<h1 id="logo-name" className="logo" >Connect-4</h1>
								</div>			
							</div>
						</div>
						<div className="col-sm-3 col-xs-5" id="accounts-wrapper">
							<AccountsUIWrapper />
						</div>
					</div>
					
					
				</nav>
				<main>
					<div className="row">
						<div className="col-xs-1 col-md-2"></div>
						<div className="col-xs-10 col-md-8">
						{this.props.currentUser ?<Board games={this.props.games} historicGames={this.props.historicGames} activeGame={this.props.activeGame}
						hideNavBar={this.hideNavBar.bind(this)} showNavBar={this.showNavBar.bind(this)} /> : <Login />}
						</div>
						<div className="col-xs-1 col-md-2"></div>
					</div>
				</main>
			</div>
		);
	}
}

App.propTypes = {
	currentUser: PropTypes.object,
};

export default createContainer(() => {
	Meteor.subscribe('games');
	function activeGame () {
		if(Meteor.user()) return Games.find({ $and: [
							{
								$or: [
									{'p1._id':{$eq: Meteor.userId()}},
									{'p2._id':{$eq: Meteor.userId()}}
								]
							}, 
							{
								$or: [
									{state:{$eq: 'playing'}},
									{state:{$eq: 'waiting'}}
								]
							}
						]}).fetch();
		return null;
	}
	function findHistoricGames(){
		if(Meteor.user()) return Games.find({ $and: [
							{
								$or: [
									{'p1._id':{$eq: Meteor.userId()}},
									{'p2._id':{$eq: Meteor.userId()}}
								]
							}, 
							{
								state:{$eq: 'ended'},
							}
						]}).fetch();
		return null;

	}
	return {
		games: Games.find({}, { sort: { date_started: -1 } }).fetch(),
		activeGame: activeGame(),
		currentUser: Meteor.user(),
		historicGames: findHistoricGames(),
	};
}, App);