global.chai = require('chai');
global.expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

beforeEach(() => {
  global.sandbox = sinon.createSandbox();
});

afterEach(() => {
  global.sandbox.restore();
});
