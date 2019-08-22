import React, { Component } from 'react';
import './Button.scss';

export default class Button extends Component {

    render() {
        return(
            <main className="component-button">
                <button className="btn btn-default" onClick={() => this.props.reloadCard()}>Try Again</button>
            </main>
        )
    }
}