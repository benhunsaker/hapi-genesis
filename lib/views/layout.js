import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Head from './partials/head';


export default class Layout extends Component {
    render() {

        return (
            <html lang="en-us" className="no-js">
                <Head title="Hapi Genisus" />
                <body>
                    <div id="main-content" />

                    <script src={this.props.clientScript} />
                </body>
            </html>
        );
    }
};

Layout.propTypes = {
    clientScript: PropTypes.String
};
