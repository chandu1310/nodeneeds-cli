const proxyquire = require('proxyquire')

const sampleresponse = {
  'dist-tags': {
    latest: 'newversion',
  }
}

const download = (uri) => new Promise((res) => {
  if(uri === 'https://registry.npmjs.org/@chandu1310/nodeneeds')
    res( Buffer.from(JSON.stringify( sampleresponse )) );
  else
    res('somedata');
});

describe('checkPackageVersion', () => {
  let backup;

  before(() => {
    backup = console.log;
    console.log = sandbox.stub();
  });

  after(() => {
    console.log = backup;
  })

  it('displays version info when versions dont match', () => {
    const moduleWithDependency = proxyquire('../../src/actions/check-package-version', 
      {
        download,
      }
    );

    return moduleWithDependency.checkPackageVersion()
    .then(
      () => {
        expect(console.log.called).to.be.true;
      }
    )
  }).timeout(5000);

  it('displays version info when versions match', () => {
    const packageJson = { version: 'newversion' }
    const moduleWithDependency = proxyquire('../../src/actions/check-package-version', 
      {
        download,
        '../../package.json': packageJson,
      }
    );
    return moduleWithDependency.checkPackageVersion()
    .then(
      () => {
        expect(console.log.called).to.be.true;
      }
    )
  }).timeout(5000);

  it('still shows some message when registry fetch fails', () => {
    const failingdownload = () => Promise.resolve(null);

    const moduleWithDependency = proxyquire('../../src/actions/check-package-version', 
      {
        download: failingdownload,
      }
    );
    return moduleWithDependency.checkPackageVersion()
    .then(
      () => {
        expect(console.log.called).to.be.true;
      }
    )
  }).timeout(5000);

});