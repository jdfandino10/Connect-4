import React, {Component} from 'react';

export default class Message extends Component {

  hide() {
    this.props.finishGame();
    this.props.toggleModal('hidden');
  };

  close(e) {
    e.preventDefault();
    this.hide();
  };

  render() {
    return (

      <div className="row fixed-container">
      <div className="col-xs-1"></div>
      <div className={"message-container col-xs-10 "+this.props.show}>

      <div className="col-xs-12">
        <div className="row">
        <div className="col-xs-12">
        <h3>Finished game!</h3>
        </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-sm-6 col-md-3-offset">
            {this.props.game.winner != 'tie'?
            <h1>Winner!!!<span className="red"></span>: {this.props.game.winner}</h1>:
            <h1>It was a {this.props.game.winner}!!!<span className="red"></span></h1>
            }
            {this.props.game.winner === Meteor.user().username
            ?<h3>You Won!</h3>: this.props.game.winner != 'tie'? <h3>Maybe the next time ;)</h3>:<h3>Good game!</h3>}
            <h3>Score for {this.props.game.p1.username}: {this.props.game.p1.score}</h3>
            <h3>Score for {this.props.game.p2.username}: {this.props.game.p2.score}</h3>
          </div>

        </div>

        <div className="row">
            <div className="col-sm-7 col-xs-2"></div>
            <div className="col-sm-1 col-xs-2">
            </div>
            <div className="col-sm-2 col-xs-4">
              <button className="btn btn-danger" onClick={this.close.bind(this)}>Finish the game</button>
            </div>
          </div>

        <div className="col-xs-1"></div>
      </div>
    </div>
  </div>

    );
  }
}
