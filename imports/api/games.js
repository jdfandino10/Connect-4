import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
	Meteor.publish('games', function gamesPublication(){
		return Games.find(/*{
			$or: [
			{ private: { $ne: true } }, //cambiar esto a que el juego tenga estado waiting y no sea privado
			{ owner: this.userId }, //cambiar esto a que this.userId sea parte de alguno de los jugadores
			],
		}*/);
	});
}
/*
game: {
	p1: {_id, username}, //datos jugador 1
	p2: {_id, username}, //datos jugador 2
	cols: [[0,0,0,0,0]....,[1,2,0,0,0]], //matriz donde cols[columna][fila]
	turn, //0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
	state, //estado: waiting, playing, ended
	date_started, //fecha inicio
	date_ended, //fecha finalizacion
	winner, //undefined o string del username ganador. Si un jugador se retira el que queda queda ganador
	private //boolean que indica si la sesion es privada (solo se puede unir con el id del juego)
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