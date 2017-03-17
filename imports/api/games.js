import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
	Meteor.publish('games', function gamesPublication(){
		return Games.find(/*{
			$or: [
			{ private: { $ne: true } }, //cambiar esto a que el juego tenga campo para algun jugador
			{ owner: this.userId }, //cambiar esto a que this.userId sea parte de alguno de los jugadores
			],
		}*/);
	});
}
/*
game: {
	p1: {_id, username},
	p2: {_id, username},
	cols: [[0,0,0,0,0]....,[1,2,0,0,0]],
	turn: 0 o 1,
	state,
	date_started,
	date_ended,
	winner
}
*/
Meteor.methods({

	'games.newGame'(userId) {
		check(userId, String);

	},
	'games.start'(gameId) {
		check(gameId, String);

	},
	'games.end'(gameId) {
		check(gameId, String);

	},
	'games.join'(gameId) {
		check(gameId, String);

	},
	'games.joinRandom'(gameId) {
		check(gameId, String);

	},
	'games.move'(gameId) {
		check(gameId, String);

	},

});