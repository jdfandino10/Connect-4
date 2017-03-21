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
	p1: {_id, username, score}, //datos jugador 1
	p2: {_id, username, score}, //datos jugador 2
	cols: [[0,0,0,0,0]....,[1,2,0,0,0]], //matriz donde cols[columna][fila]
	turn, //0 o 1 para indicar que es el turno del jugador 1 o 2 respectivamente
	state, //estado: waiting, playing, ended
	date_started, //fecha inicio
	date_ended, //fecha finalizacion
	winner, //undefined o string del username ganador. Si un jugador se retira el que queda queda ganador
	p //boolean que indica si la sesion es privada (solo se puede unir con el id del juego) true si privada, false de lo contrario
}
*/
Meteor.methods({

	'games.newGame'(p=false) {
		let cols=[];
		for(var i = 0; i<7; i++){
			var c=[];
			for(var j=0; j<6; j++){
				c[j]=0;
			}
			cols[i]=c;
		}
		let p1 = {_id:this.userId, username:Meteor.user().username};
		let p2 = {_id:undefined, username:undefined};
		let turn = 0;
		let state = 'waiting';
		let date_started = new Date();
		let game = {p1,p2,cols,turn,state,date_started, p};
		Games.insert(game);

	},

	'games.winner'(gameId) {
		check(gameId, String);
		//hace validacion y cambia el winner y el score(NO EL ESTADO)
	},
	'games.end'(gameId) {
		check(gameId, String);

	},
	'games.join'(gameId) {
		check(gameId, String);

		let game = Games.findOne(gameId);
		if(game.p2._id) throw new Meteor.Error('already playing');
		let player = {_id:this.userId, username:Meteor.user().username};
		Games.update(gameId, { $set: { p2: player, state:'playing' } }); 

	},
	'games.move'(gameId, col) {
		check(gameId, String);
		check(col, Number);

		let game = Games.findOne(gameId);
		if ((game.turn===0 && this.userId!==game.p1._id) ||
			(game.turn===1 && this.userId!==game.p2._id)) {
			throw new Meteor.Error('not-authorized');
		}
		console.log(game);
		let gameCol = game.cols[col];
		let i=gameCol.length-1;
		while(i>=0 && gameCol[i]!==0) i--;
		game.cols[col][i]=game.turn+1;
		Games.update(gameId, { $set: { cols:game.cols, turn: (game.turn+1)%2 } });
	},

});