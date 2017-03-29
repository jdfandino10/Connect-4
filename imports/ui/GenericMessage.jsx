import React, {Component} from 'react';

export default class GenericMessage extends Component {

  accept(e) {
    e.preventDefault();
    this.props.remove();
  };

  cancel(e) {
    e.preventDefault();
    this.props.cancel();
  }

  render() {
    return (

      <div className="row fixed-container">
        <div className="message-float col-xs-12">
          <div className="message-container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="text-center game-over">{this.props.title}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <p>{this.props.message}</p>
              </div>
             </div>
             <div className="row">
               <div className="col-xs-12 text-center">
                 <button className="btn options" onClick={this.accept.bind(this)}>Ok</button>
                 {this.props.showCancel?<button className="btn options" onClick={this.cancel.bind(this)}>Cancel</button>:''}
               </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
