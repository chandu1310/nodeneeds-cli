import { createTempDir } from '../../src/actions/create-temp-dir';

const tmp = require('tmp-promise');

describe('createTempDir', () => {
  let backup;

  before(() => {
    backup = tmp.dir;
    tmp.dir = sandbox.stub().returns(Promise.resolve({ path: '/test' }));
  });

  after(() => {
    tmp.dir = backup;
  })

  it('calls tmp-promise cleanup method', () => createTempDir({ id: 1})
    .then(
      (v) => {
        expect(v).to.deep.equal({ id: 1, fileDestination: '/test' });
      }
    )
  );

});