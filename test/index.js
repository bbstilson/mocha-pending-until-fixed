const sinon = require('sinon');
const { expect } = require('chai');

const pendingUntilFixed = require('../src/pendingUntilFixed.js');

describe('pendingUntilFixed', () => {
  it('marks a test as skipped if the test fails on an expect clause', () => {
    const skipSpy = sinon.spy();

    pendingUntilFixed(function () {
      expect(true).to.be.false;
    })
    .call({
      skip: skipSpy
    });

    expect(skipSpy.calledOnce).to.be.true;
  });

  it('marks a test as skipped if the test fails on a rejected promise', () => {
    const skipSpy = sinon.spy();

    return pendingUntilFixed(function () {
      return Promise.reject();
    })
    .call({ skip: skipSpy })
    .then(() => {
      expect(skipSpy.calledOnce).to.be.true;
    })
    .catch(() => {
      expect(false, 'Promise rejected when it should have resolved.').to.be.ok;
    });
  });

  it('marks a test as failing if the test passes', () => {
    const skipSpy = sinon.spy();

    expect(() => {
      pendingUntilFixed(function() {
        expect(true).to.be.true;
      }).call({ skip: skipSpy });
    }).to.throw(Error);

    expect(skipSpy.callCount === 0).to.be.true;
  });

  it('marks a test as failing (rejecting) if the test returns a resolved promise', () => {
    const skipSpy = sinon.spy();

    return pendingUntilFixed(function() {
      return Promise.resolve();
    })
    .call({ skip: skipSpy })
    .then(() => {
      expect(false, 'Promise resolved when it should have rejected.').to.be.ok;
    })
    .catch(() => {
      expect(skipSpy.callCount === 0).to.be.true;
    });
  });
});
