/* global Meteor*/
/* global document*/
/* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint "class-methods-use-this":
[2, { "exceptMethods": ["stopEvent", "getPointsDownDiag", "getPointsUpDiag",
                        "getPointsRight",
                       "createRow"] }]
*/
import React, { Component } from 'react';

export default class GenericMessage extends Component {

  componentDidMount() {
    this.refs.title.focus();
    if (this.props.blockFocus) this.props.blockFocus();
  }

  componentWillUnmount() {
    if (this.props.resetFocus) this.props.resetFocus();
  }

  accept(e) {
    e.preventDefault();
    this.props.remove();
  }

  cancel(e) {
    e.preventDefault();
    this.props.cancel();
  }

  blockF(e) {
    let okButton = null;
    okButton = this.refs['ok-button'];
    let cancelButton = null;
    cancelButton = this.refs['cancel-button'];
    let firstTabStop = null;
    firstTabStop = okButton;
    let lastTabStop = null;
    lastTabStop = cancelButton || okButton;
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else if (document.activeElement === lastTabStop) {
        e.preventDefault();
        firstTabStop.focus();
      }
    }
    if (e.keyCode === 27) {
      closeModal();
    }
  }

  stopEvent(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  render() {
    return (

      <div className="row fixed-container">
        <div className="message-float col-xs-12" onClick={this.props.showCancel?this.cancel.bind(this):this.accept.bind(this)}>
          <div ref="title" className="message-container" tabIndex="0" onClick={this.stopEvent.bind(this)} onKeyDown={this.blockF.bind(this)}>
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
                 <button ref="ok-button" className="btn options" onClick={this.accept.bind(this)}>Ok</button>
                 {this.props.showCancel?<button ref="cancel-button" className="btn options" onClick={this.cancel.bind(this)}>Cancel</button>:''}
               </div>
            </div>
          </div>
        </div>
        <div className="modal-overlay" onClick={this.props.showCancel?this.cancel.bind(this):this.accept.bind(this)}></div>
      </div>

    );
  }
}
