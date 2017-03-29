import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountUIWrapper extends Component {
	componentDidMount() {
		//usar blaze para renderizar los botones de login
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
	}
	componentWillUnmount() {
		Blaze.remove(this.view);
	}
	render(){
		return <span id="accounts-wrapper" ref="container" className="pull-right" />;
	}
}