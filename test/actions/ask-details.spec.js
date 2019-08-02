import { askDetails } from '../../src/actions/ask-details';

const inquirer = require('inquirer');

describe('askDetails', () => {
  let backup;
  before(() => {
    backup = inquirer.prompt;
    inquirer.prompt = () => Promise.resolve({email: 'test'})
  })

  after(() => {
    inquirer.prompt = backup;
  })

  it('it prompts user for details', () => {
    return askDetails().then(
      (resp) => {
        expect(resp).to.deep.equal({email: 'test'});
      }
    );
  });

})