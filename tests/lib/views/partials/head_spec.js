import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Head from '../../../../lib/views/partials/head';


describe('Head component', () => {

    const title = 'Test Title';
    let output;

    before(() => {

        output = shallow(<Head title={title} />);
    });

    it('returns a head tag and five children', () => {

        expect(output.type()).to.equal('head');
        expect(output.children()).to.have.length(5);
    });

    it('first child is an instance of title set to passed in title', () => {

        const headInstance = output.children().first();
        expect(headInstance.type()).equal('title');
        expect(headInstance.text()).to.eql(title);
    });

    it('second child is an instance of meta of charSet', () => {

        const charSetMeta = output.childAt(1);
        expect(charSetMeta.type()).to.equal('meta');
        expect(charSetMeta.prop('charSet')).to.eql('UTF-8');
    });

    it('third child is an instance of meta of viewport', () => {

        const viewportMeta = output.childAt(2);
        expect(viewportMeta.type()).to.equal('meta');
        expect(viewportMeta.prop('name')).to.eql('viewport');
        expect(viewportMeta.prop('content')).to.eql('width=device-width, initial-scale=1, shrink-to-fit=no');
    });

    it('fourth child is links the normalize stylesheet', () => {

        const normalizeLink = output.childAt(3);
        expect(normalizeLink.type()).to.equal('link');
        expect(normalizeLink.prop('rel')).to.eql('stylesheet');
        expect(normalizeLink.prop('href')).to.eql('https://cdnjs.com/libraries/normalize');
    });

    it('last child is links the app\'s stylesheet', () => {

        const appJSLink = output.children().last();
        expect(appJSLink.type()).to.equal('link');
        expect(appJSLink.prop('rel')).to.eql('stylesheet');
        expect(appJSLink.prop('href')).to.eql('/css/main.css');
    });
});
