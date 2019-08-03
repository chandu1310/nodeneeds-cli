import { fetchLatestRelease } from './fetch-latest-release';

const fs = require('fs');

export const getLatestRelease = (details) => {
  const { fileDestination, type } = details;
  console.log(`Fetching latest nodeneeds`);
  const releaseArchive = `${fileDestination}/released-version.zip`;
  return fetchLatestRelease(type).then(data => {
    fs.writeFileSync(releaseArchive, data);
    return Object.assign( {}, details, { releaseArchive } );
  });
}
