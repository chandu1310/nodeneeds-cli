import { cleanUp } from '../../src/actions/cleanup';

const tmp = require('tmp-promise');

describe('cleanUp', () => {
  let backup;

  before(() => {
    console.log('Setting up stubs');
    backup = tmp.setGracefulCleanup;
    tmp.setGracefulCleanup = sandbox.stub();
  });

  it('calls tmp-promise cleanup method', () => {
    cleanUp();
    expect(tmp.setGracefulCleanup.called).to.be.true;
  });

  after(() => {
    console.log('Restoring stubs');
    tmp.setGracefulCleanup = backup;
  });

});