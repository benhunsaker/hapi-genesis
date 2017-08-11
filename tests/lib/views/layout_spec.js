import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Layout from '../../../lib/views/layout';
import Head from '../../../lib/views/partials/head';


describe('Layout component', () => {

    const jsScriptName = 'test.js';
    let output;

    before(() => {

        output = shallow(<Layout clientScript={jsScriptName} />);
    });

    it('returns an html with proper props and two children', () => {

        expect(output.type()).to.equal('html');
        expect(Object.keys(output.props())).to.eql(['lang', 'className', 'children']);
        expect(output.prop('lang')).to.equal('en-us');
        expect(output.prop('className')).to.equal('no-js');
        expect(output.children()).to.have.length(2);
    });

    it('first child is an instance of Head with proper props', () => {

        const headInstance = output.children().first();
        expect(headInstance.is(Head)).to.ok;
        expect(headInstance.props()).to.eql({ title: 'Hapi Genisus' });
    });

    it('Last child is an instance of body', () => {

        expect(output.children().last().is('body')).to.ok;
    });

    it('body includes 1 instance of nav with className "navbar"', () => {

        const nav = output.find('nav');
        expect(nav).to.have.length(1);
        expect(nav.hasClass('navbar')).to.be.ok;
    });

    it('body includes 1 instance of div with an id "main-content"', () => {

        const contDiv = output.find('div');
        expect(contDiv).to.have.length(1);
        expect(contDiv.prop('id')).to.equal('main-content');
    });

    it('body includes 1 instance of script with a source of the passed in script name', () => {

        const jsScript = output.find('script');
        expect(jsScript).to.have.length(1);
        expect(jsScript.prop('src')).to.equal(`/js/${jsScriptName}`);
    });
});
