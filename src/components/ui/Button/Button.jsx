import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export default class Button extends Component {

    /**
     * Validar tipos de props
     */
    static get propTypes() { 
        return {
            reloadCard: PropTypes.func,
            text: PropTypes.string
        }; 
    }

    render() {
        return(
            <main className="component-button">
                <button className="btn btn-default" onClick={() => this.props.reloadCard()}>{this.props.text}</button>
            </main>
        )
    }
}
