import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Layout from '../views/layout';


const internals = {};


const Root = {
    description: 'Root handler',
    handler: (request, reply) => reply(`<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(<Layout clientScript="app.bundle.js" />)}`)
};

export default { Root };
