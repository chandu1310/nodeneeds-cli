const proxyquire = require('proxyquire')

const download = (type) => new Promise((res) => {
  console.log('type>>>>',type);
  if(type === 'https://api.github.com/repos/chandu1310/nodeneeds-npm/releases/latest')
    res( Buffer.from(JSON.stringify({ zipball_url: 'http://somezipfile' })) );
  else
    res('somedata');
});

describe('fetchLatestRelease', () => {
  let moduleWithDependency;
  before(() => {
    moduleWithDependency = proxyquire('../../src/actions/fetch-latest-release', 
      {
        download,
      }
    );
  });

  it('returns somedata after invoking download module', () => {
    return moduleWithDependency.fetchLatestRelease("NPM Package")
    .then(
      (data) => {
        expect(data).to.equal('somedata');
      }
    )
  }).timeout(5000);

});