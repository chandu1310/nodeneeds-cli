import * as ASK from '../src/actions/ask-details';
import * as TMP from '../src/actions/create-temp-dir';
import * as LTR from '../src/actions/get-latest-release';
import * as EXF from '../src/actions/extract-file';
import * as CUP from '../src/actions/cleanup';
import { startCli } from '../src/cli';

describe('cli', () => {
  beforeEach(() => {
    console.log('Lets stub stuff');
    sandbox.stub(ASK, 'askDetails').callsFake(() => { console.log('fake-ask-details'); return Promise.resolve(1); });
    sandbox.stub(TMP, 'createTempDir').callsFake(() => { console.log('fake-create-temp-dir'); return Promise.resolve(2); });
    sandbox.stub(LTR, 'getLatestRelease').callsFake(() => { console.log('fake-get-latest-release'); return Promise.resolve(3); });
    sandbox.stub(EXF, 'extractFile').callsFake(() => { console.log('fake-extract-file'); return Promise.resolve(4); });
    sandbox.stub(CUP, 'cleanUp').callsFake(() => { console.log('fake-clean-up'); return Promise.resolve(5); });
  });

  it('calls actions as expected', () => {
    return startCli().then(() => {
      expect(ASK.askDetails.called).to.be.true;
      expect(TMP.createTempDir.called).to.be.true;
      expect(LTR.getLatestRelease.called).to.be.true;
      expect(EXF.extractFile.called).to.be.true;
      expect(CUP.cleanUp.called).to.be.true;
    });
  });

})