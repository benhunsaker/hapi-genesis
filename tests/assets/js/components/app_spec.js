/* eslint-env mocha */
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import App from '../../../../assets/js/components/app';


describe('App Component', () => {

    it('renders a div.container with 1 child', () => {

        const output = shallow(<App />);

        expect(output.type()).to.equal('div');
        expect(output.prop('className')).to.equal('container');
        expect(output.children).to.have.lengthOf(1);
    });

    it('contains a h1 with "Hello World!"', () => {

        const output = shallow(<App />).find('h1');

        expect(output).to.be.ok;
        expect(output.text()).to.equal('Hello World!');
    });
});
