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

  componentDidMount() {
    this.refs.title.focus();
    this.props.blockFocus();
    console.log(this.props.blockFocus);
  }

  blockF(e) {
    let okButton = this.refs['ok-button'];
    let cancelButton = this.refs['cancel-button'];
    let firstTabStop = okButton;
    let lastTabStop = cancelButton || okButton;
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if(document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }
      } else {
        if(document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
    if(e.keyCode === 27) {
      closeModal();
    }
  }

  componentWillUnmount() {
    this.props.resetFocus();
  }

  stopEvent( e ) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  render() {
    return (

      <div className="row fixed-container">
        <div className="message-float col-xs-12" onClick={this.props.showCancel?this.cancel.bind(this):this.accept.bind(this)}>
          <div ref="title" role="dialog" className="message-container" tabIndex="0" onClick={this.stopEvent.bind(this)} onKeyDown={this.blockF.bind(this)}>
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
