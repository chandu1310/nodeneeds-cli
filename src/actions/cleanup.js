const tmp = require('tmp-promise');

export const cleanUp = () => {
  console.log('Cleaning up any leftover mess!');
  tmp.setGracefulCleanup();
}
