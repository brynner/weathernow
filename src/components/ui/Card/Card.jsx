import React, { Component } from 'react';
import PropTypes from 'prop-types';

// UI
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import './Card.scss';

export default class Card extends Component {

    /**
     * Validar tipos de props
     */
    static get propTypes() { 
        return {
            error: PropTypes.bool,
            title: PropTypes.string,
            stats: PropTypes.number,
            statsSymbol: PropTypes.string,
            footerInfo: PropTypes.object,
        }; 
    }

    render() {
        return (
            <main className="component-card">
                <div className="card-header">
                    <h2>{this.props.title}</h2>
                </div>

                {this.props.loading ?
                    <Loading />
                    :
                    <div>
                        {this.props.error ?
                            <ErrorMessage reloadCard={this.props.reloadCard} />
                            :
                            <div>
                                {this.props.stats ?
                                    <CardContent props={this.props} />
                                    : ''
                                }
                            </div>
                        }
                    </div>
                }
            </main>
        )
    }
}

const ErrorMessage = ({reloadCard}) => {
    return (
        <div>
            <div className="card-body">
                <div className="error">
                    <div className="alert alert-error">Something went wrong!</div>
                    <Button reloadCard={reloadCard} text={`Try Again`} />
                </div>
            </div>
        </div>
    )
}

const CardContent = ({props}) => {
    return (
        <div>
            <div className="card-body">
                <div className={`stats stats-${props.statsColor}`} data-symbol={props.statsSymbol}>
                    <span>{props.stats}</span>
                </div>
            </div>

            <div className="card-footer">

                {props.footerInfo.show ?
                    <div>
                        <div className="info">
                            <label>{props.footerInfo.firstInfo}</label>
                            <p>{props.footerInfo.firstValue}<span>{props.footerInfo.firstValueSymbol}</span></p>
                        </div>
                        <div className="info">
                            <label>{props.footerInfo.secondInfo}</label>
                            <p>{props.footerInfo.secondValue}<span>{props.footerInfo.secondValueSymbol}</span></p>
                        </div>
                    </div>
                    : ''
                }

                <div className="status">
                    {props.footerInfo.statusInfo} {props.footerInfo.statusValue}
                </div>
            </div>
        </div>
    )
}
