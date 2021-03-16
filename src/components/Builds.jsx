import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';


class Builds extends Component {

    constructor(props) {
        super(props);   
    }

    render() {
        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <span className="widget__header__count">
                    </span>
                    <i className="fa fa-running" />
                </div>
                <div className="widget__body">
                    Hello from builds component
                </div>
            </div>
        );
    }
}

Builds.displayName = 'Builds';

reactMixin(Builds.prototype, ListenerMixin);
reactMixin(Builds.prototype, Mozaik.Mixin.ApiConsumer);

export default Builds;
