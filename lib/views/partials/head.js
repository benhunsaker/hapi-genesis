import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Head extends Component {
    render() {

        return (
            <head>
                <title>{this.props.title}</title>

                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://cdnjs.com/libraries/normalize" />
                <link rel="stylesheet" href="/css/main.css" />
            </head>
        );
    }
}

Head.propTypes = {
    title: PropTypes.string.isRequired
};
