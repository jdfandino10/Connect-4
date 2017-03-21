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
				
				<h1>Connect-4</h1>
				<AccountsUIWrapper />
				{this.props.currentUser ?<Board games={this.props.games} activeGame={this.props.activeGame}/> : <Login />}
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
		console.log('actualiza active game');
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
	console.log(Games.find({ $and: [
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
						]}).fetch());
	return {
		games: Games.find({}, { sort: { date_started: -1 } }).fetch(),
		activeGame: activeGame(),
		currentUser: Meteor.user(),
	};
}, App);