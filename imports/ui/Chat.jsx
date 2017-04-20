/* global Meteor*/
/* global document*/
/* eslint "react/prop-types": [0, { ignore: [historicGames] }] */
/* eslint "no-nested-ternary": [0] */
/* eslint arrow-body-style: [0]*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint "react/jsx-no-bind": [2, {
  "ignoreRefs": true,
  "allowArrowFunctions": true,
  "allowBind": true
}]*/
/* eslint prefer-template: "off"*/
import React, { Component } from 'react';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  getAdversary() {
    let p1 = {};
    p1 = this.props.gameChat.p1;
    let p2 = {};
    p2 = this.props.gameChat.p2;
    return p1.username === Meteor.user().username ? p2.username : p1.username;
  }

  chat(e) {
    e.preventDefault();
    Meteor.call('games.chat', this.props.gameChat._id, Meteor.user().username + ': ' + this.state.message);
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
    this.setState({ message: '' });
  }

  render() {
    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-sm-8 col-xs-12">
            <div className="row">
              <h3>Chat with {this.getAdversary()}!</h3>
            </div>
            <div className="row chat_scroll" id="chat" aria-live="polite">
              {this.props.gameChat.chat
                ? this.props.gameChat.chat.map((message, index) => {
                  const key = index;
                  return <div key={key}>{message}</div>;
                }) : <h5>Start chatting!</h5> }
            </div>
            <div className="row">
              <div className="col-xs-8">
                <form id="id_chat_form">
                  <input
                    name="chat" type="text" placeholder="Here your message..." value={this.state.message}
                    onChange={(input) => { this.setState({ message: input.target.value }); }}
                  />
                </form>
              </div>
              <div className="col-xs-4">
                <button form="id_chat_form" value="Submit" className="options" onClick={this.chat.bind(this)}>Chat</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
