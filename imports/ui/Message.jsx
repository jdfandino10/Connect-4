import React, {Component} from 'react';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: this.props.game.winner,
      p1: {username: this.props.game.p1.username, score: this.props.game.p1.score},
      p2: {username: this.props.game.p2.username, score: this.props.game.p2.score},
    };
  }

  close(e) {
    e.preventDefault();
    this.props.finishGame();
  };

  iWon() {
    var winner = this.state.winner;
    var me = Meteor.user().username;
    return winner === me;
  }

  tie() {
    return this.state.winner === 'tie';
  }

  render() {
    return (

      <div className="row fixed-container">
        <div className="message-container col-xs-12">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="text-center game-over">Game Over</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 results ">
              {
                this.iWon()?<h2 className="winner-msg">You won!</h2>:(this.tie()?<h2>Tie</h2>:<h2 className="loser-msg">You lost...</h2>)
              }

              { this.iWon()?
                <h3>Congratulations!</h3>: (this.state.winner !== 'tie'? <h3>Better luck next time</h3>:<h3>Good game!</h3>)
              }
              </div>
              <div className="col-xs-6 scores">
                <h3>Scores</h3>
                  <div className="row">
                    <div className="col-xs-12">
                      <p><strong>{this.state.p1.username}:</strong> {this.state.p1.score} points</p>
                      <p><strong>{this.state.p2.username}:</strong> {this.state.p2.score} points</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="row">
               <div className="col-xs-12">
                 <button className="btn options" onClick={this.close.bind(this)}>Ok</button>
               </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
