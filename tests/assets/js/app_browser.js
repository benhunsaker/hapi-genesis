/* eslint-env mocha */

import React from 'react';
import ReactDOM from 'react-dom';
import Sinon from 'sinon';
import { expect } from 'chai';

import InitApp from '../../../assets/js/app';
import App from '../../../assets/js/components/app';


let renderSpy;
let rootDiv;


describe('The App entry point', () => {

    before((done) => {

        renderSpy = Sinon.spy(ReactDOM, 'render');

        document.body.insertAdjacentHTML('afterbegin','<div id="root"></div>');

        rootDiv = document.getElementById('root');

        InitApp();

        setTimeout(done, 1800);
    });

    after(() =>  {

        document.getElementById('root').remove();
        renderSpy.restore();
    });

    it('with Root, #root', () => {

        expect(renderSpy.calledWithExactly(<App />, rootDiv)).to.be.ok;
    });

    it('is not called if root and ibm-signin-minimenu-container are not present', (done) => {

        renderSpy.reset();

        document.getElementById('root').remove();

        InitApp();

        setTimeout(() => {

            document.body.insertAdjacentHTML('afterbegin','<div id="root"></div>');

            expect(renderSpy.notCalled).to.be.ok;

            done();
        }, 1800);
    });
});
