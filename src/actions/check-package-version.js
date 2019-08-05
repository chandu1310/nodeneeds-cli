const download = require('download');
const packageJson = require('../../package.json');

const uri = "https://registry.npmjs.org/@chandu1310/nodeneeds"

export const checkPackageVersion = () => download(uri)
  .then(
    response => {
      let data;
      if (response)
        data = JSON.parse(response.toString())
      console.log(`Nodeneeds ${packageJson.version}`);
      console.log(`==================`);
      console.log(`Checking for any new update.`);
      if (data && data['dist-tags'] && data['dist-tags'].latest) {
        const latestVersion = data['dist-tags'].latest;
        if (latestVersion !== packageJson.version) {
          console.log(`\nWarning!\nA new version ${latestVersion} is available.\nUpdate using the command:\n=>> npm update -g @chandu1310/nodeneeds\nor\n=>> yarn global upgrade @chandu1310/nodeneeds\n`);
        } else {
          console.log(`Installed version is the latest.`);
        }
      }
      console.log(`Lets Begin!`);
    }
  );