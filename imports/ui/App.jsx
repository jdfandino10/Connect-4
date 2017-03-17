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
			<div>
				{/*Por ahora solo hay titulo jaja*/}
				<h1>Connect-4</h1>
				<AccountsUIWrapper />
				{this.props.currentUser ? <Board /> : <Login />}
			</div>
		);
	}
}

App.propTypes = {
	currentUser: PropTypes.object,
};

export default createContainer(() => {
	Meteor.subscribe('games');
	return {
		currentUser: Meteor.user(),
	};
}, App);