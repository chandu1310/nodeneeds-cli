import * as FLR from '../../src/actions/fetch-latest-release';
import { getLatestRelease } from '../../src/actions/get-latest-release';

const fs = require('fs');

describe('getLatestRelease', () => {
  let flrStub, fsStubBackup;
  
  before(() => {
    flrStub = sandbox.stub(FLR, 'fetchLatestRelease')
    flrStub.returns(Promise.resolve('http://abcd'));

    fsStubBackup = fs.writeFileSync;
    fs.writeFileSync = sandbox.stub();

  });

  it('returns latest release info', () => {
    return getLatestRelease({ fileDestination: '/root/mydir', type: 'abcd' })
      .then(
        () => {
          expect(fs.writeFileSync.called).to.be.true;
          expect(flrStub.called).to.be.true;
          expect(flrStub).to.have.been.calledWith("abcd");
        }
      );
  });

  after(() => {
    fs.writeFileSync = fsStubBackup;
  });

});