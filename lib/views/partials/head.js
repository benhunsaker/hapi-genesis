import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Head extends Component {
    render() {

        return (
            <head>
                <title>{this.props.title}</title>

                <meta charSet="UTF-8" />

                <link href="/static/css/main.css" />
            </head>
        );
    }
}

Head.propTypes = {
    title: PropTypes.String
};
