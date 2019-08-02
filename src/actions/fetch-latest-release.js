const download = require('download');

const releaseInfoUrls = {
  "NPM Package": "https://api.github.com/repos/chandu1310/nodeneeds-npm/releases/latest",
  "Lambda based Rest Service": "https://api.github.com/repos/chandu1310/nodeneeds-npm/releases/latest",
  "ReactJS App": "https://api.github.com/repos/chandu1310/nodeneeds-npm/releases/latest",
  "Lerna Mono Repo": "https://api.github.com/repos/chandu1310/nodeneeds-npm/releases/latest"
}

export const fetchLatestRelease = (type) => download(releaseInfoUrls[type])
.then(
  data => {
    const json = JSON.parse(data.toString());
    return download(json.zipball_url);
  }
);
