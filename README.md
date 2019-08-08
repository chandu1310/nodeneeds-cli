# nodeneeds
[![Build Status](https://travis-ci.org/chandu1310/nodeneeds-cli.svg?branch=master)](https://travis-ci.org/chandu1310/nodeneeds-cli)
[![npm latest version](https://img.shields.io/npm/v/@chandu1310/nodeneeds/latest.svg)](https://www.npmjs.com/package/@chandu1310/nodeneeds)
[![Maintainability](https://api.codeclimate.com/v1/badges/fad88d02dc9d734289b8/maintainability)](https://codeclimate.com/github/chandu1310/nodeneeds-cli/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fad88d02dc9d734289b8/test_coverage)](https://codeclimate.com/github/chandu1310/nodeneeds-cli/test_coverage)

nodeneeds is an out of the box node module which can be used to get started on building a NPM package with all the
best practicies. 

The features supported include:
- Coding Standard (ES6, ESLint)
- Testing Framework (Chai, Mocha & Sinon.JS)
- Code Management (Git, Conventional Commits, Changelog)
- Continuos Integration Support (Travis CI)
- Quality Analysis (Code Climate)

# Getting Started

With all that background in mind, lets get started and create your very own npm package and publish it to npmjs.org

### Required:
You must have installed nodejs on you machine, else [here](https://howtonode.org/how-to-install-nodejs) is the detailed instruction on how to do it.

### Steps:

After you have installed node and npm on your machine, go ahead and install the nodeneeds tool by running the following command 

`npm install nodeneeds -g`

This install the nodeneeds tool as a command that you can invoke at your shell prompt.

For now let us try to create a default NPM package and publish it.

Navigate to any directory of your choice (referring it as workspace from now on) eg. your home directory and run 

`nodeneeds`

This starts the tool and asks a bunch of questions and usually has some default answers too.

`nodeneeds`
`? What is the name of the node module? (abcd-1565303009156)`

Provide the name of the node module you are creating. Defaults to username-timestamp

`? How do you intend to use it? (Use arrow keys)`

`❯ NPM Package`

  `Lambda based Rest Service`

  `ReactJS App Lerna Mono Repo`

Select the option which lets us create an npm package. Rest of the options are not yet available and still create the default npm package.

That is all. It should run through fetching the latest nodeneeds definition if needed and bootstrap a nodejs package for you with the given name. It cleans up any temp files created at the end.

`Fetching latest nodeneeds`

`Created NPM module abcd-1565303009156`

`Cleaning up any leftover mess!`


Have fun!

## Credits
[Chandra Shekar Chennamsetty](https://github.com/chandu1310)
