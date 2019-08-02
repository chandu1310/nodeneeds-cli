const tmp = require('tmp-promise');

export const createTempDir = (details) => tmp.dir({ 
    mode: 750,
    prefix: 'node-needs_',
    unsafeCleanup: true
  }).then(
    o => Object.assign({}, details, { fileDestination: o.path} )
  );

