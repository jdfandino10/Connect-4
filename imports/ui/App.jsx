import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Login from './Login.jsx';
import Board from './Board.jsx';

import { Games } from '../api/games.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


class App extends Component {



	render() {
		return (
			<div className="container">
				<a href="#maincontent" className="skip-link" >Skip to main content</a>
				<nav>
					<div className="row">
						<div className="col-sm-1 hidden-xs"></div>
						<div className="col-sm-8 col-xs-6">
							<h1 className="logo">Connect-4</h1>
						</div>
						<div className="col-sm-3 col-xs-6">
							<AccountsUIWrapper />
						</div>
					</div>
					
					
				</nav>
				<main id="maincontent">
					<div className="row">
						<div className="col-xs-1 col-md-2"></div>
						<div className="col-xs-10 col-md-8">
						{this.props.currentUser ?<Board games={this.props.games} historicGames={this.props.historicGames} activeGame={this.props.activeGame}/> : <Login />}
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