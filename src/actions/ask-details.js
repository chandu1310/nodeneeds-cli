const inquirer = require('inquirer');

const username = require("os").userInfo().username;
const questions = [
  {
    type: "input",
    name: "appname",
    message: "What is the name of the node module?",
    default: `${username}-${Date.now()}`
  },
  {
    type: "list",
    name: "type",
    message: "How do you intend to use it?",
    choices: [
      "NPM Package",
      "Lambda based Rest Service",
      "ReactJS App",
      "Lerna Mono Repo"
    ]
  }
];

export const askDetails = () => {
  console.log('Lets begin!');    
  return inquirer.prompt(questions); 
}

